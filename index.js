import express from 'express';
import 'dotenv/config';
import { xss } from "express-xss-sanitizer";
import expressLayouts from "express-ejs-layouts";
import session from 'express-session';
import { mainRouter } from './app/routers/index.js';


// Création du serveur express
const app = express();


// Express vérifie si le navigateur a un cookie
// En l'occurence ici il vérifie si on a une session ouverte

app.use(session({
    secret: process.env.APP_SECRET,
    resave: false, // n'enregistre pas la session à chaque requête si rien ne change
    saveUninitialized: false, 
    cookie: { secure: process.env.APP_ENV === 'production'}
}));

// On stocke la session dans une variable locale
// Elle est acccessible dans chacun des fichiers ou middlewares
app.use((req, res, next) => {
    res.locals.session = req.session;
    next() // permet de passer au middleware suivant
})

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
app.set('views', './app/views');

// Indiquer le chemin du layout à afficher 
app.set('layout', 'layouts/app');


app.use(mainRouter);

// Test pour savoir si le serveur est bien branché au port
app.listen(PORT, () => {
    console.log(`The server is currently listening events on http://localhost:${PORT}... ✅`)
});