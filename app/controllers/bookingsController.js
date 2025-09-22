import { Booking, Property } from "../models/index.js"
import { bookingSchema } from "../schemas/booking.schema.js";
import { Op } from "sequelize";

export const bookingsController = {

    // Accéder à l'ensemble des réservations
    async getAll (req,res) {

        // On récupère l'id du user 
        const userId = req.session.user.id;

        // On veut accéder aux réservations et afficher les biens
        // On inclut donc le model des biens en plus de celui des réservations
        const bookings = await Booking.findAll({
            where: { user_id: userId},
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

    async booking (req,res) {

        // On récupère l'id du bien réservé 
        const propertyId = parseInt(req.params.propertyId, 10);

         if (isNaN(propertyId) || propertyId <= 0) {
            return res.status(404).render("pages/404", { title: "Introuvable" });
        }

        // On cherche le bien correspondant à cet id
        const property = await Property.findByPk(propertyId);

        if (!property) {
            return res.status(404).render("pages/404", { title: "Introuvable" });
        }

        // On vérifie les données envoyées dans la requête avec le schéma adéquat
        const { error, value } = bookingSchema.validate(req.body);

        if (error) {
            return res.status(400).render('pages/bookings/bookingForm', { 
                title: `Réserver ${property.name}`,
                error: "Form fields are not correct.",
                property
            });
        }

        const { start_date, end_date } = value;

        // Eviter les incohérences lors de la réservation 
        if (start_date >= end_date) {
            return res.status(400).render('pages/bookings/bookingForm', {
                title: `Réserver ${property.name}`,
                error: "End date must be superior to start date.",
                property
            });
        }

        //Eviter les chevauchements de réservation 
        const overlap = await Booking.findOne({
            where: {
                property_id: propertyId,
                start_date: { [Op.lt]: end_date },
                end_date:   { [Op.gt]: start_date },
            },
        });

        if (overlap) {
                return res.status(409).render("pages/bookings/bookingForm", {
                title: `Réserver ${property.name}`,
                property,
                errors: ["This booking is not available on these dates."],
            })       
        }

        const userId  = req.session.user.id;
        if (!userId) {
            return res.redirect(`/login`);
        }

        await Booking.create({
            user_id: userId,
            property_id: propertyId,
            start_date,
            end_date,
        });

        return res.redirect('/bookings/me', { title : "Mes réservations", property });
    },

    async cancel (req,res) {

        const { id } = req.params;

        const booking = await Booking.findByPk(id);

        if (!booking) {
            return res.status(404).render("pages/404", { title: "Introuvable" });
        }

        if (booking.user_id !== req.session.user.id) {
            return res.status(403).render("pages/404", { title: "Introuvable" });
        }

        await booking.destroy();

        return res.redirect(303, '/bookings/me');
    },
}