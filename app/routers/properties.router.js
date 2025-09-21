import { Router } from "express";
import { propertiesController } from "../controllers/propertiesController.js";
import { onlyGuest, onlyAuthenticated } from "../middlewares/authenticate.middleware.js";
import { checkId } from "../middlewares/checkId.middleware.js";

export const propertiesRouter = Router();

// Route pour accéder à toutes les propriétés
propertiesRouter.get('/properties', propertiesController.getAll);

// Accéder à une propriété par son id 
propertiesRouter.get('/properties/:id', checkId, propertiesController.getById)
