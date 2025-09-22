import Joi from "joi";
import { Property } from "../models/index.js"
import { propertySchema }  from "../schemas/property.schema.js"

export const propertiesController = {

    // Accéder à l'ensemble des propriétés
    async getAll (req,res) {

        // On les affichera triés par : 
        // Nom en ordre alphabétique et id croissant
        const properties = await Property.findAll({
            order: [
                ["name", "ASC"],
                ["id", "ASC"]
            ]
        });

        res.status(200).render('pages/properties/allProperties', { title: "Biens", properties })
    },

    // Accéder à un bien par son id
    async getById (req,res) {
        
        // On récupère l'id 
        const { id } = req.params;

        // On cherche dans la BDD si un bien existe avec cet id
        const property = await Property.findByPk(id);

        // Si ce n'est pas le cas on renvoie une erreur
        if (!property) {
            return res.status(404).render('pages/404', { title: "Introuvable" });
        }

        // Si il existe on affiche ce bien dans la view 
        res.status(200).render('pages/properties/show', { title : property.name, property });
    },

    async showPropertyForm (req,res) {
        res.status(200).render('pages/properties/propertyForm', { title : "Ajouter un bien" });
    },

    async addProperty (req,res) {

        // Récupération des informations nécessaires dans la requête 
        // On vérifie si elles sont conformes 
        const { error, value } = propertySchema.validate(req.body);

        if (error) {
            return res.status(400).render('pages/properties/propertyForm', { 
                title: "Ajouter un bien",
                error: "Form fields are not correct."
            });
        }

        const { name, description, price_per_night } = value;

        const newProperty = await Property.create({name, description, price_per_night});

        res.redirect(`/properties/${newProperty.id}`, { title: "Ajout réussi !", newProperty });
    },

    async deleteById (req, res) {

        // Récupération de l'id dans la requête 
        const { id } = req.params;

        // On vérifie si on trouve un bien correspondant à l'id
        const property = await Property.findByPk(id);

        if (!property) {
            return res.status(404).render('pages/404', { title: "Introuvable" });
        }

        // Suppression du bien demandé
        await property.destroy();

        return res.redirect(303, '/properties');
    }
}