import Joi from "joi";
import { Booking, Property } from "../models/index.js"
import { bookingSchema } from "../schemas/booking.schema.js";

export const bookingsController = {

    // Accéder à l'ensemble des réservations
    async getAll (req,res) {

        // On récupère l'id du user 
        const { id } = req.session.user;

        // On veut accéder aux réservations et afficher les biens
        // On inclut donc le model des biens en plus de celui des réservations
        const bookings = await Booking.findAll({
            where: { user_id: id},
            order: [["start_date", "DESC"]],
            include: [
                { model: Property, as: "property", attributes: ["id", "name", "price_per_night"] }
            ],
        });

        res.status(200).render('pages/bookings/allBookings', { title: "Mes réservations", bookings })
    },

}