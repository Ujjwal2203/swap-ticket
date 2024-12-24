import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { registeredUser } from "../controllers/user.controller.js";

const router = Router()

router.post("/register",registeredUser)



export default router