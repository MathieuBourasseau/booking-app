import { Router } from "express";
import { authController } from "../controllers/authController.js";

export const authRouter = Router();

// Routes vers le controller d'authentification
authRouter.get('/register', authController.showForm);

// Route pour s'inscrire via le formulaire
authRouter.post('/register', authController.register);

authRouter.get('/login', authController.login);