import express from 'express';
import 'dotenv/config';

// Création du serveur express
const app = express();

// Attribution du port du serveur express
const PORT = process.env.PORT || 3000;

// Test pour savoir si le serveur est bien branché au port
app.listen(PORT, () => {
    console.log(`The server is currently listening events on http://localhost:${PORT}... ✅`)
});