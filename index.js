import express from 'express';
import 'dotenv/config';
import { xss } from "express-xss-sanitizer";
import expressLayouts from "express-ejs-layouts";
import session from 'express-session';
import { mainRouter } from './app/routers/index.js';
import pg from 'pg'; 
import pgSession from 'connect-pg-simple';

// Création du serveur express
const app = express();

// Configuration de la connexion PostgreSQL pour les sessions
const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.APP_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const PgSession = pgSession(session);

app.set('trust proxy', 1)

// Configuration de express-session
app.use(session({
  store: new PgSession({ pool: pgPool, tableName: 'user_sessions', createTableIfMissing: true }),
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.APP_ENV === 'production', // true en prod
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 1 // durée de 1 jour
  },
  name: 'sid'
}));

// On stocke la session dans une variable locale
// Elle est acccessible dans chacun des fichiers ou middlewares
app.use((req, res, next) => {
    res.locals.session = req.session;
    next() // permet de passer au middleware suivant
})

// Attribution du port du serveur express
const PORT = process.env.PORT || 3000;

// Transforme les données json en objets js
app.use(express.json());

// Permet de lire et récupérer les requêtes des formulaires HTML
app.use(express.urlencoded({ extended: true }));

// Sécurise les données envoyées via formulaire pour éviter les injections SQL
app.use(xss());

app.use(express.static('public'));

// Permet d'afficher des views à partir d'un layout sans répétition du code
// le contenu de la view sera généré en fonction de la view indiquée
app.use(expressLayouts);

// EJS permet d'afficher les views
app.set('view engine', 'ejs');

// Indique le chemin des views à afficher
app.set('views', './app/views');

//Indique le chemin du layout relatif à views
app.set("layout", "layouts/app");

app.use((req, res, next) => {
  if (typeof res.locals.title === "undefined") {
    res.locals.title = "Booking App" };
    next();
});

app.use(mainRouter);


// Middleware de gestion des pages introuvables
app.use((req, res) => {
  res.status(404).render("pages/404", {
    title: "Introuvable",
    url: req.originalUrl,
  });
});

// Middleware de gestion des autres erreurs
app.use((err, _req, res, _next) => {

  const errorId = Date.now().toString(36);
  console.error('[500]', errorId, err);
  if (res.headersSent) return;
  return res.status(500).render('pages/500', { title : "Erreur serveur", errorId });
});


// Test pour savoir si le serveur est bien branché au port
app.listen(PORT, () => {
    console.log(`The server is currently listening events on http://localhost:${PORT}... ✅`)
});