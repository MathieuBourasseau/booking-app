import Joi from "joi";

export const propertySchema = Joi.object({
    name: Joi.string().min(5).required(), // le nom doit faire 5 caractères minimum
    description: Joi.string().min(10).required(), // la description doit faire au moins 10 caractères
    price_per_night: Joi.number().min(0).max(999999.99).precision(2).required() // on autorise un prix qui accepte 0 mais pas en dessous et deux chiffres après la virgule
});