import { Router } from "express";
import { authController } from "../controllers/authController.js";

export const authRouter = Router();

authRouter.get('auth/register', authController.register);
authRouter.get('auth/login', authController.login);