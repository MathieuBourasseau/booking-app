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

    async showBookingForm (req, res){
        
        // On récupère l'id du bien sélectionné
        const propertyId = parseInt(req.params.propertyId, 10);

        if (isNaN(propertyId) || propertyId <= 0) {
            return res.status(404).render("pages/404", { title: "Introuvable" });
        }

        // On vérifie qu'il existe bien en BDD
        const property = await Property.findByPk(propertyId);

        if (!property) {
            return res.status(404).render("pages/404", { title: "Introuvable" });
        }

        // On affiche le formulaire 
        return res.status(200).render("pages/bookings/bookingForm", { title: `Réserver ${property.name}`, property });
    },



}