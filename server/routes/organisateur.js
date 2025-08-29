const express = require('express');
const router = express.Router();
const path = require('path');
const { logAction } = require('../../utils/logger');
const { Evenement } = require('../models');

// Chemin vers le fichier dashboard.html
const dashboardPath = path.join(__dirname, '../../public/organisateur/dashboard.html');

// Route pour afficher le tableau de bord de l'organisateur
router.get('/dashboard', (req, res) => {
  res.sendFile(dashboardPath);
});

// Créer un événement
router.post('/events', async (req, res) => {
  const userId = 1; // dans l'idéal remplacer par l'id réel
  logAction(userId, 'Tentative de création d\'un événement', req.body);

  try {
    const { titre, description, date, lieu } = req.body;

    // Crée un nouvel événement dans la base de données
    const event = await Evenement.create({
      titre,
      description,
      date: new Date(date),
      lieu,
      organisateur_id: userId
    });

    logAction(userId, 'Événement créé avec succès', { titre, description, date, lieu });
    res.status(201).json(event);
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    logAction(userId, 'Erreur lors de la création d\'un événement', { error: error.message });
    res.status(500).json({ message: 'Erreur lors de la création de l\'événement' });
  }
});

// Obtenir tous les événements
router.get('/events', async (req, res) => {
  try {
    const events = await Evenement.findAll();
    res.json(events);
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
  }
});

// Modifier un événement
router.put('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, date, lieu } = req.body;

    const event = await Evenement.findByPk(id);

    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    await event.update({ titre, description, date: new Date(date), lieu });

    res.status(200).json(event);
  } catch (error) {
    console.error('Erreur lors de la modification de l\'événement:', error);
    res.status(500).json({ message: 'Erreur lors de la modification de l\'événement' });
  }
});

// Supprimer un événement
router.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Evenement.findByPk(id);

    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    await event.destroy();
    res.status(200).json({ message: 'Événement supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'événement' });
  }
});

module.exports = router;
