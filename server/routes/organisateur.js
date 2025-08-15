const express = require('express');
const router = express.Router();
const path = require('path');
const { logAction } = require('../../utils/logger');

// Chemin vers le fichier dashboard.html
const dashboardPath = path.join(__dirname, '../../public/organisateur/dashboard.html');

// Route pour afficher le tableau de bord de l'organisateur
router.get('/dashboard', (req, res) => {
  const userId = 1; // Remplace par l'ID de l'utilisateur connecté (ex: req.session.user.id)
  logAction(userId, 'Accès au tableau de bord organisateur');
  console.log('Accès à la page dashboard de l\'organisateur');
  res.sendFile(dashboardPath, (err) => {
    if (err) {
      console.error('Erreur lors de l\'envoi du fichier dashboard.html:', err);
      res.status(500).send('Erreur lors du chargement de la page');
    } else {
      console.log('Fichier dashboard.html envoyé avec succès');
    }
  });
});

// Créer un événement
router.post('/events', async (req, res) => {
  const userId = 1; // Remplace par l'ID de l'utilisateur connecté (ex: req.session.user.id)
  logAction(userId, 'Tentative de création d\'un événement', req.body);
  console.log('Tentative de création d\'un événement avec les données:', req.body);
  try {
    const { titre, description, date, lieu } = req.body;

    // Logique pour créer un événement
    console.log('Création de l\'événement:', { titre, description, date, lieu });
    const event = { titre, description, date, lieu }; // Remplace par ta logique réelle
    logAction(userId, 'Événement créé avec succès', { titre, description, date, lieu });
    res.status(201).json(event);
    console.log('Événement créé avec succès');
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    logAction(userId, 'Erreur lors de la création d\'un événement', { error: error.message });
    res.status(500).json({ message: 'Erreur lors de la création de l\'événement' });
  }
});

module.exports = router;
