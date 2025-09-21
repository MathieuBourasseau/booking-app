import Joi from "joi";
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

        res.render('pages/properties/allProperties', { title: "Biens", properties })
    },

    // Accéder à un bien par son id
    async getById(req,res) {
        
        // On récupère l'id 
        const { id } = req.params;

        // On cherche dans la BDD si un bien existe avec cet id
        const property = await Property.findByPk(id);

        // Si ce n'est pas le cas on renvoie une erreur
        if(!property) {
            return res.render('pages/properties/show', {
                title: "Biens",
                error: "this id property does not exist."
            });
        }

        // Si il existe on affiche ce bien dans la view 
        res.render('pages/properties/show', {title : property.name, property});
    }
}