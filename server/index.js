const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, '../public')));

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
