import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { loginUser, registeredUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/login").post(loginUser)



export default router