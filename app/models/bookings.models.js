import { sequelize } from "./index.js";
import { DataTypes, Model } from "sequelize";

// Création du model bookings
// id + timestamps générés automatiquement par sequelize

class Bookings extends Model {}

Bookings.init(
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
        tableName: "bookings"
    }
);