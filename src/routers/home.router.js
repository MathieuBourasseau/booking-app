import { Router } from "express";
import { homeController } from "../controllers/homeController.js";

// Création du router 
export const homeRouter = Router();

// Route qui va mener vers le controller 
homeRouter.get('/', homeController.displayHome);