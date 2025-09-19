import { Router } from "express";
import { homeController } from "../controllers/homeController.js";
import { authRouter } from "./auth.router.js";


// Création du router 
export const mainRouter = Router();

// Route qui va mener vers le controller de la home
mainRouter.get('/', homeController.displayHome);

// Route qui mène vers l'authenfication
mainRouter.use(authRouter);


