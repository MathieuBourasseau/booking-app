import { Router } from "express";
import { authController } from "../controllers/authController.js";

export const authRouter = Router();

// Routes vers le controller d'authentification
authRouter.get('auth/register', authController.register);
authRouter.get('auth/login', authController.login);