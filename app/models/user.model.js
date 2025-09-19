import { DataTypes, Model } from "sequelize"; // nécessaires pour créer les models
import { sequelize } from "./sequelize.client.js"; // correspond à la BDD

export class User extends Model {}

User.init(

    //Définition des attributs du model 
    // Ils correspondront au champ des tables
    {
        username: {
            type : DataTypes.STRING(30), // On limite le nom d'utilisateur à 30 caractères maximals
            allowNull: false,   // On le définit comme non nullable
            unique: true, // On empêche la création d'utilisateur ayant le même nom.
        },

        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize, // On indique que les informations de connexion
        tableName: "user" // On indique le nom de la table dans la BDD.
    }
);