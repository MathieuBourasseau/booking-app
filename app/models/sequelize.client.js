// Sequelize = ORM avec express
import { Sequelize } from "sequelize";
import 'dotenv/config';

// Connexion de la base de données à l'ORM
// On définit l'architecture de la base de données
export const sequelize = new Sequelize(
    process.env.DB_URL,
    {
        logging: false, // On enlève les opérations faites en console log par Sequalize
        define: {
            createdAt: "created_at", //Permettra de voir le moment de la création d'une donnée dans la DB
            updatedAt: "updated_at", // idem mais avec la mise à jour d'une donnée.
            underscored: true, // Les nommages seront en snake_case
        }
    }
);

try {

    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully. ✅");

} catch (error) {

    console.error("Unable to connect to the database.❌")

};
