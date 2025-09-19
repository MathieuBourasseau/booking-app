import Joi from "joi"; // permet de valider les données reçues en fonction des critères voulues

export const userSchema = Joi.object({
    username: Joi.string().min(3).required(), // Le username devra au minimum faire 3 caractères et de type string.
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required() // On définit les mots de passe qui seront acceptés. 
});