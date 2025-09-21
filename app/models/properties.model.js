import { sequelize } from "./index.js";
import { DataTypes, Model } from "sequelize";

// Création du model propreties
// l'id est géré automatiquement par sequelize
// le timestamps également car définit dans sequelize.client.js

export class Properties extends Model {}

Properties.init(
    {
        name : {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        
        description: {
            type : DataTypes.TEXT,
            allowNull: false,
        },

        price_per_night : {
            type : DataTypes.DECIMAL(8,2)
        }
    },
    {
        sequelize,
        tableName: "properties"
    }
);