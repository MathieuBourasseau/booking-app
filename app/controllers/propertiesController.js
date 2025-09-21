import { Property } from "../models/index.js"

export const propertiesController = {

    // Accéder à l'ensemble des propriétés
    async getAll(req,res) {

        // On les affichera triés par : 
        // Nom en ordre alphabétique et id croissant
        const properties = await Property.findAll({
            order: [
                ["name", "ASC"],
                ["id", "ASC"]
            ]
        });

        res.render('pages/properties', { title: "Bien", properties })
    },

}