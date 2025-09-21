import { Router } from "express";
import { propertiesController } from "../controllers/propertiesController.js";
import { onlyGuest, onlyAuthenticated } from "../middlewares/authenticate.middleware.js";

export const propertiesRouter = Router();

// Route pour accéder à toutes les propriétés
propertiesRouter.get('/properties', propertiesController.getAll);


