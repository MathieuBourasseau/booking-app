import { sequelize } from "./sequelize.client.js";
import { DataTypes, Model } from "sequelize";

// Création du model bookings
// id + timestamps générés automatiquement par sequelize

export class Booking extends Model {}

Booking.init(
    {
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        end_date: {
            type: DataTypes.DATEONLY,
            allowNull:false,
        }
    },
    {
        sequelize,
        tableName: "booking"
    }
);