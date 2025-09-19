import Joi from "joi";
import { userSchema } from "../schemas/user.schema.js";

export const authController = {

    // Méthode pour afficher le form

    showForm (req, res) {
        res.render('pages/register', { title : "Inscription"});
    },

    // Méthode pour créer un compte
    register (req, res) {
        
        // On souhaite que l'utilisateur crée un compte pour cela : 
        // On doit récupérer dans la requête les informations nécessaires : username + password 
        // Et vérifier que les informations envoyées sont au bon format via le schéma. 
        const { username, password} = Joi(req.body, userSchema);

        
       
        // On doit vérifier si l'ID existe. Si il existe on renvoie un message d'erreur
        // Si c'est ok on créé le nouvel utilisateur
        // On renvoie la réponse en json 

        res.render('pages/register', {title : "Inscription"});
    },

    // Méthode pour se connecter 
    login (req,res) {
        res.render('pages/login', { title: "Connexion"});
    }
}