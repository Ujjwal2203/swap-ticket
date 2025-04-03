import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

// Generate Refresh & Access Tokens
const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateaccesstoken();
    const refreshToken = user.generaterefreshtoken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(500, "Failed to generate tokens.");
  }
};

// Register User
const registeredUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if ([userName, password, email].some((field) => field?.trim() === "")) {
    throw new apiError(400, "All fields are required.");
  }

  const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
  if (existingUser) {
    throw new apiError(409, "User with email or username already exists.");
  }

  const user = await User.create({ email, password, userName: userName.toLowerCase() });
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new apiError(500, "Server error, user not registered.");
  }

  return res.status(201).json(new apiResponse(201, createdUser, "User successfully registered."));
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!(email || userName)) {
    throw new apiError(400, "Email or username is required.");
  }

  const user = await User.findOne({ $or: [{ userName }, { email }] });
  if (!user) {
    throw new apiError(404, "User not found, please register.");
  }

  const isPasswordValid = await user.ispasswordcorrect(password);
  if (!isPasswordValid) {
    throw new apiError(401, "Incorrect password, try again!");
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const cookieOptions = { httpOnly: true, secure: true, sameSite: "Strict" };

  return res.status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new apiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully."));
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { refreshToken: undefined }, { new: true });

  const cookieOptions = { httpOnly: true, secure: true, sameSite: "Strict" };

  return res.status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new apiResponse(200, {}, "User logged out successfully."));
});

// Refresh Access Token
const refreshAccessToken = asyncHandler(async(req,res)=>{
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new apiError(401, "Unauthorized request.");
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);
  
    if (!user || incomingRefreshToken !== user?.refreshToken) {
      throw new apiError(401, "Invalid or expired refresh token.");
    }
  
    // Generate new access token and refresh token  
    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(user._id);
    
    return res.status(200)
      .cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true, sameSite: "None" })
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "None" })
      .json(new apiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed successfully."));
      
  } catch (error) {
    throw new apiError(401, "Access token refresh failed.");
  }
});


// Check User Session (Persistent Login)
const checkUserSession = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json(new apiResponse(401, {}, "User not logged in."));
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
      return res.status(401).json(new apiResponse(401, {}, "Invalid session."));
    }

    const accessToken = user.generateaccesstoken();
    const cookieOptions = { httpOnly: true, secure: true, sameSite: "Strict" };

    return res.status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .json(new apiResponse(200, { user, accessToken }, "User is logged in."));
  } catch (error) {
    return res.status(401).json(new apiResponse(401, {}, "Session expired."));
  }
});

// Change Current Password
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  const isPasswordCorrect = await user.ispasswordcorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new apiError(400, "Incorrect old password.");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new apiResponse(200, {}, "Password changed successfully."));
});

export { registeredUser, loginUser, logoutUser, refreshAccessToken, checkUserSession, changeCurrentPassword };
