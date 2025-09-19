import Joi from "joi";
import { userSchema } from "../schemas/user.schema.js";
import { User } from "../models/user.model.js";
import argon2 from "argon2";

export const authController = {

    // Méthode pour afficher le form

    showForm (req, res) {
        res.render('pages/register', { title : "Inscription"});
    },

    // Méthode asynchrone pour créer un compte
    async register (req, res) {
        
        // On souhaite que l'utilisateur crée un compte pour cela : 
        // On doit récupérer dans la requête les informations nécessaires : username + password 
        // Et vérifier que les informations envoyées sont au bon format via le schéma. 
        const {error, value} = userSchema.validate(req.body);

        // On fait un return en cas d'erreur
        if (error) {
            return res.render('pages/register', {
                title: "Inscription",
                error: "form fields are not correct."
            });
        }

        // Si tout est ok on poursuit le chemin dans le controller.
        const { username, password } = value;

        // Sequelize dispose de fonctions natives permettant de faire le CRUD
        // On utilise le model User pour aller vérifier si le User n'existe pas déjà dans la BDD.
        const isUserExists = await User.findOne({ where : {username : username}} ); 

        if (isUserExists) {
            return res.render('pages/register', {
                title: "Inscription",
                error: "User already exists !"
            });
        }

        // hashage du mot de passe via argon2: 
        const hashedPassword = await argon2.hash(password);

        // On créé le nouvel utilisateur
        await User.create({ username, password: hashedPassword });

        //L'utilisateur est redirigé vers la view login en cas de succès.
        res.redirect('/login');
    },

    // Méthode pour se connecter 
    login (req,res) {
        res.render('pages/login', { title: "Connexion"});
    }
}