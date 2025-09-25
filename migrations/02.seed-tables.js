import { User, Booking, Property, sequelize } from "../app/models/index.js";
import 'dotenv/config';
import argon2 from "argon2";

// Seeding pour tester la fonctionnalité des tables et models

const bookingDate = (date) => date.toISOString().slice(0,10);

console.log('🌱 Seeding …')

// Créations de plusieurs utilisateurs
const user = await User.findOrCreate({
    username: "Toto",
    password: await argon2.hash('azerty')
});

const user2 = await User.findOrCreate({
    username: "Jean",
    password: await argon2.hash('12345')
});

// Créations de propriétés
const property = await Property.findOrCreate({ 
    name: "La villa du Nord", 
    description : "Située à proximité des commerces et à 5 min à pied de la plage.", 
    price_per_night : 70.00 
});

const property2 = await Property.findOrCreate({
    name: "Les castors chanteurs",
    description: "Vue montagne, et randonnées à proximité",
    price_per_night: 55.00
});

// Création d'une réservation 

// Récupération de la date actuelle
const startBookingDate = new Date();

// On déclare la date du début de réservation
// ici 7 jours après la date actuelle
startBookingDate.setDate(startBookingDate.getDate() + 7);

const endBookingDate = new Date();

// On déclare la date à laquelle on finit la réservation
// ici 7 jours après la date du début
endBookingDate.setDate(endBookingDate.getDate() + 14);

await Booking.create({
    start_date : bookingDate(startBookingDate),
    end_date: bookingDate(endBookingDate),
    user_id: user.id,
    property_id: property.id,
});

console.log("Seeding terminé ✅")

await sequelize.close();
