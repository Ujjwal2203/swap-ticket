import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  registeredUser,
  loginUser,
  logoutUser,
  checkUserSession,
  refreshAccessToken,
  googleOneTapLogin, // One Tap handler
  verifyTicketForwarded,
} from "../controllers/user.controller.js";
import razorpayRoutes from './razorpay.route.js';

const router = Router();

// Registration
router.post("/register", registeredUser);

// Login (email/password)
router.post("/login", loginUser);

// Google One Tap Login
router.post('/google/onetap', googleOneTapLogin);

// Logout
router.post("/logout", verifyJWT, logoutUser);

// Session check
router.get("/session", checkUserSession);

// Refresh access token
router.post("/refresh-token", refreshAccessToken);

// Verify forwarded ticket
router.post("/verify-ticket",  verifyTicketForwarded);

// Razorpay payment route
router.use("/payment", razorpayRoutes);

export default router;
