import express from 'express';
import 'dotenv/config';
import { xss } from "express-xss-sanitizer";


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

// EJS permet d'afficher les views
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get('/', (req, res) => {
    res.render('pages/home');
});

// Test pour savoir si le serveur est bien branché au port
app.listen(PORT, () => {
    console.log(`The server is currently listening events on http://localhost:${PORT}... ✅`)
});