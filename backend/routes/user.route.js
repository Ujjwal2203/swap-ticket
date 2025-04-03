import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { registeredUser, loginUser, logoutUser, checkUserSession, refreshAccessToken } from "../controllers/user.controller.js";

const router = Router();

// Registration
router.post("/register", registeredUser);

// Login
router.post("/login", loginUser);

// Logout (Requires valid access token)
router.post("/logout", verifyJWT, logoutUser);

// Session Check (Validate refresh token to keep user logged in)
router.get("/session", checkUserSession);

// Refresh Access Token (If access token expires, generate a new one)
router.post("/refresh-token", refreshAccessToken);

export default router;
