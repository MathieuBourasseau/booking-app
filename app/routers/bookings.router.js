import { Router } from "express";
import { onlyGuest, onlyAuthenticated } from "../middlewares/authenticate.middleware.js";
import { checkId } from "../middlewares/checkId.middleware.js";
import { bookingsController } from "../controllers/bookingsController.js";

export const bookingRouter = Router();

// Route pour accéder aux réservations
bookingRouter.get('/bookings/me', onlyAuthenticated, bookingsController.getAll);
