import express from 'express';
import 'dotenv/config';
import { xss } from "express-xss-sanitizer";
import expressLayouts from "express-ejs-layouts";

import { homeRouter } from './src/routers/home.router.js';


// Création du serveur express
const app = express();

// Attribution du port du serveur express
const PORT = process.env.PORT || 3000;

// Sécurise les données envoyées via formulaire pour éviter les injections SQL
app.use(xss());

// Transforme les données json en objets js
app.use(express.json());

// Permet de lire et récupérer les requêtes des formulaires HTML
app.use(express.urlencoded({ extended: true }));

// Permet d'afficher des views à partir d'un layout sans répétition du code
// le contenu de la view sera généré en fonction de la view indiquée
app.use(expressLayouts);
app.set("layout", "./src/views/layouts/app");

// EJS permet d'afficher les views
app.set('view engine', 'ejs');

// Indique le chemin des views à afficher
app.set('views', './src/views');

// Indiquer le chemin du layout à afficher 
app.set('layout', 'layouts/app');


app.use(homeRouter);

// Test pour savoir si le serveur est bien branché au port
app.listen(PORT, () => {
    console.log(`The server is currently listening events on http://localhost:${PORT}... ✅`)
});