import { sequelize } from "./sequelize.client.js";
import { Property } from "./property.model.js";
import { Booking } from "./booking.model.js";
import { User } from "./user.model.js";
import { Session } from "./userSession.model.js";

// Gestion des associations entre model 

// User :
// Un utilisateur peut avoir 0 ou plusieurs réservation
User.hasMany(Booking, {
    foreignKey: "user_id",
    as: "bookings"
});

// Une réservation appartient à un utilisateur
Booking.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE", 
    as:"user" 
});

// Properties : 
// Une propriété peut avoir 0 ou plusieurs réservation
Property.hasMany(Booking, {
    foreignKey: "property_id",
    as: "bookings"
});

// Une réservation appartient à une propriété 
Booking.belongsTo(Property, {
    foreignKey: "property_id",
    onDelete : "CASCADE",
    as: "property"
});

export { sequelize, User, Property, Booking, Session };