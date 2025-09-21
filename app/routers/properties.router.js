import { Router } from "express";
import { propertiesController } from "../controllers/propertiesController.js";
import { onlyGuest, onlyAuthenticated } from "../middlewares/authenticate.middleware.js";
import { checkId } from "../middlewares/checkId.middleware.js";

export const propertiesRouter = Router();

// Route pour accéder à tous les biens
propertiesRouter.get('/properties', propertiesController.getAll);

// Route pour accédder au formulaire d'ajout d'un bien
propertiesRouter.get('/properties/create', onlyAuthenticated, propertiesController.showPropertyForm)

// Route pour ajouer un bien 
propertiesRouter.post('/properties/create', onlyAuthenticated, propertiesController.addProperty)

// Accéder à une propriété par son id 
propertiesRouter.get('/properties/:id', checkId, propertiesController.getById)
