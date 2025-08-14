const express = require('express');
const session = require('express-session'); // Importation du module express-session
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Middleware pour CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware pour les sessions
app.use(session({
  secret: 'votre_secret', // Remplacez par une clé secrète forte
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Mettez à true si vous utilisez HTTPS
}));

// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, '../public')));

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Route pour la page d'accueil
app.get('/accueil', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/accueil.html'));
});

// Route pour la page de login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route pour la page d'administration
app.get('/admin/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

// Importer les routes d'administration
const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);

// Importer les routes d'authentification
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

// Importer les routes de l'organisateur
const organisateurRouter = require('./routes/organisateur');
app.use('/organisateur', organisateurRouter);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
