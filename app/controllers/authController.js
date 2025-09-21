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

    // Affiche le formulaire de connexion 
    showLoginForm (req, res){

        // Si on est connecté, on empêche l'accès à la partie création d'un compte.
        if (req.session.user){
            return res.redirect('/')
        }

        res.render('pages/login', { title : "Connexion" });
    },

    // Méthode pour se connecter 
    async login (req,res) {

        // Récupération des données contenues dans la requête
        // Vérification de celles-ci en les passant par le schéma
        const {error, value} = userSchema.validate(req.body);

        if (error) {
            return res.render('pages/login', {
                title: "Connexion",
                error: "username or password is not correct."
            });
        }

        const { username, password } = value;

        // On vérifie ensuite que l'utilisateur existe bien dans la BDD
        const user = await User.findOne({ where : {username : username}} );

        // Si l'user n'existe pas on envoie un message d'erreur
        if(!user){
            return res.render('pages/login', { error : "User does not exist." });
        }

        // On vérifie le mot de passe : 
        const isPasswordValid = await argon2.verify(user.password, password);

        if(!isPasswordValid) {
            return res.render('pages/login', { error : "Password is incorrect." })
        }

        // Via le module session d'express on créé une session
        // Le client pourra ainsi stocker ces infos dans un cookies
        req.session.user = {
            id: user.id,
            username: user.username
        };

        console.log("User is connected ! ✅")
        // En cas de succès de connexion on renvoie vers la page d'accueil
        res.redirect('/')
    },

    logout (req,res) {
        req.session.destroy();
        res.redirect('/login')
    }
}