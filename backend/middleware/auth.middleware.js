import {apiError} from "../utils/apiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"

export const verifyJWT = asyncHandler(async(req,res,next) => {    
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new apiError(401, "Authorization failed or unauthorized access");
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        // If access token expired, try refreshing
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
          const newAccessToken = await refreshAccessToken(refreshToken);
          res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: true, sameSite: "Strict" });
          req.user = decodedToken;
          return next();
        } else {
          throw new apiError(401, "Access token expired. Please re-login.");
        }
      }
      
      req.user = decodedToken;
      next();
    });
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid Access Token");
  }
  
}) 