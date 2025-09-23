import { Router } from "express";
import { authController } from "../controllers/index.js";
import { onlyGuest, onlyAuthenticated } from "../middlewares/authenticate.middleware.js";

export const authRouter = Router();

// Routes vers le controller d'authentification
// Protégée par le middleware onlyGuest
authRouter.get('/register', onlyGuest, authController.showForm);

// Route pour s'inscrire via le formulaire
// Protégée par le middleware onlyGuest
authRouter.post('/register', onlyGuest, authController.register);

authRouter.get('/login', onlyGuest, authController.showLoginForm);
authRouter.post('/login', onlyGuest, authController.login);

// Route pour la déconnexion 
authRouter.post('/logout', onlyAuthenticated, authController.logout);