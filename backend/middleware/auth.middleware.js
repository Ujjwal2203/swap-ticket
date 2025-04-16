import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { refreshAccessToken } from "../controllers/user.controller.js"; // Ensure this works and returns token

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

  // Check for access token
  if (!accessToken) {
    console.log("❌ No access token found in cookies or headers");
    throw new apiError(401, "Authorization failed or unauthorized access");
  }

  try {
    // Verify the access token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;  // Attach user info to the request
    return next();  // Proceed to the next middleware
  } catch (err) {
    console.log("⚠️ Token verification failed:", err.message);

    // Handle access token expiration
    if (err.name === "TokenExpiredError") {
      const refreshToken = req.cookies?.refreshToken;

      // Check for refresh token
      if (!refreshToken) {
        console.log("❌ No refresh token available");
        throw new apiError(401, "Session expired. Please log in again.");
      }

      try {
        // Try to get a new access token using the refresh token
        const newAccessToken = await refreshAccessToken(refreshToken);

        // Set new access token in the cookie
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,  // Secure cookie setting
          secure: process.env.NODE_ENV === "production",  // Ensure true in production
          sameSite: "Lax",
          maxAge: 24 * 60 * 60 * 1000,  // 1 day expiration
        });

        // Decode the new access token and attach user to request
        const decodedNew = jwt.decode(newAccessToken);
        req.user = decodedNew;
        return next();  // Proceed to next middleware after setting the new token
      } catch (refreshErr) {
        console.log("❌ Refresh token failed:", refreshErr.message);
        throw new apiError(401, "Session expired. Please log in again.");
      }
    }

    // In case of any other token verification issues
    throw new apiError(401, "Invalid or expired token");
  }
});
