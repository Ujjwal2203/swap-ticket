import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';
import Imap from 'imap';
import { simpleParser } from 'mailparser';
// import imaps from 'imap-simple';


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

// Google Login
const googleOneTapLogin = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: 'No credential received.' });
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    return res.status(500).json({ message: 'Server misconfiguration: Missing Google Client ID' });
  }

  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Google user:", payload);

    res.status(200).json({ message: "Google login successful!", user: payload });
  } catch (err) {
    console.error("Google login failed:", err);
    res.status(403).json({ message: "Invalid token or origin." });
  }
};

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
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new apiError(401, "Unauthorized request. Refresh token is missing.");
  }

  try {
    // Verify the refresh token
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Fetch user from the database
    const user = await User.findById(decodedToken?._id);
    
    if (!user) {
      throw new apiError(401, "User not found.");
    }

    // Validate that the incoming refresh token matches the stored refresh token
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new apiError(401, "Invalid or expired refresh token.");
    }

    // Generate new access and refresh tokens
    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(user._id);

    // Set new tokens in cookies (make sure secure and sameSite are properly set for production)
    return res.status(200)
      .cookie("refreshToken", newRefreshToken, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",  // Secure only in production
        sameSite: "None",  // Allows cross-site cookie use
        maxAge: 24 * 60 * 60 * 1000  // Set expiry to 1 day
      })
      .cookie("accessToken", accessToken, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "None", 
        maxAge: 24 * 60 * 60 * 1000  // Set expiry to 1 day
      })
      .json(new apiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed successfully."));
    
  } catch (error) {
    console.error("❌ Error refreshing access token:", error.message);
    throw new apiError(401, "Access token refresh failed.");
  }
});



// Check User Session (Persistent Login)
const checkUserSession = asyncHandler(async (req, res) => {
  // ✅ Check if session-based login (Google OAuth)
  if (req.user) {
    return res.status(200).json(new apiResponse(200, {
      user: {
        userName: req.user.userName,
        email: req.user.email
      }
    }, "User is logged in (session)"));
  }

  // 🔁 Fallback: JWT-based session check
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
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  // true in prod, false in dev
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax"
    };
    

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

const verifyTicketForwarded = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new apiError(400, "Email is required.");
  }

  const imapConfig = {
    user: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_APP_PASSWORD, // Use Gmail App Password here
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  };

  try {
    const emailFound = await new Promise((resolve, reject) => {
      const imap = new Imap(imapConfig);

      imap.once("ready", () => {
        imap.openBox("INBOX", true, (err, box) => {
          if (err) {
            imap.end();
            return reject(new apiError(500, "Error opening inbox."));
          }

          const searchCriteria = ["ALL"];
          const fetchOptions = { bodies: "", struct: true };

          imap.search(searchCriteria, (err, results) => {
            if (err) {
              imap.end();
              return reject(new apiError(500, "Error searching emails."));
            }

            if (!results.length) {
              imap.end();
              return resolve(false); // No emails found
            }

            const fetch = imap.fetch(results, fetchOptions);
            const parsePromises = [];

            fetch.on("message", (msg) => {
              parsePromises.push(
                new Promise((resolve) => {
                  msg.on("body", (stream) => {
                    simpleParser(stream, (err, parsed) => {
                      if (err) return resolve(false);

                      const isToAppEmail = parsed.to?.value.some(
                        (recipient) => recipient.address === "swaptickets001@gmail.com"
                      );
                      const isFromUserEmail = parsed.from?.value.some(
                        (sender) => sender.address === email
                      );

                      const keywords = ["ticket", "confirmation", "booking"];
                      const body = parsed.text || parsed.html || "";

                      const containsKeyword = keywords.some((keyword) =>
                        body.toLowerCase().includes(keyword.toLowerCase())
                      );

                      console.log("From:", parsed.from?.text);
                      console.log("To:", parsed.to?.text);
                      console.log("Subject:", parsed.subject);
                      console.log("Body:", body.slice(0, 200)); // Print first 200 chars

                      resolve(isToAppEmail && isFromUserEmail && containsKeyword);
                    });
                  });
                })
              );
            });

            fetch.once("end", async () => {
              const matches = await Promise.all(parsePromises);
              const found = matches.includes(true);
              imap.end();
              resolve(found);
            });
          });
        });
      });

      imap.once("error", (err) => {
        reject(new apiError(500, `IMAP connection error: ${err.message}`));
      });

      imap.once("end", () => {
        console.log("📨 IMAP connection closed.");
      });

      imap.connect();
    });

    if (emailFound) {
      return res.status(200).json(new apiResponse(200, {}, "✅ Ticket forwarded successfully."));
    } else {
      return res.status(404).json(new apiResponse(404, {}, "❌ No valid ticket found in forwarded emails."));
    }
  } catch (error) {
    console.error("Error verifying ticket:", error);
    throw new apiError(500, "Error verifying the ticket. Please try again later.");
  }
});


export { registeredUser, loginUser, logoutUser, refreshAccessToken, checkUserSession, changeCurrentPassword , googleOneTapLogin ,verifyTicketForwarded};
