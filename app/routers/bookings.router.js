import { Router } from "express";
import { onlyGuest, onlyAuthenticated } from "../middlewares/authenticate.middleware.js";
import { checkId } from "../middlewares/checkId.middleware.js";
import { bookingsController } from "../controllers/index.js";

export const bookingRouter = Router();

// Route pour accéder aux réservations
bookingRouter.get('/bookings/me', onlyAuthenticated, bookingsController.getAll);

// Route pour afficher formulaire d'une nouvelle réservation 
bookingRouter.get('/bookings/new/:propertyId', onlyAuthenticated, bookingsController.showBookingForm);

// Route pour effectuer une nouvelle réservation
bookingRouter.post('/bookings/new/:propertyId', onlyAuthenticated, bookingsController.booking);

// Route pour annuler une réservation 
bookingRouter.post('/bookings/:id', onlyAuthenticated, checkId, bookingsController.cancel);