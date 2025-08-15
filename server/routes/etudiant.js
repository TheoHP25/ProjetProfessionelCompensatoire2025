const express = require('express');
const router = express.Router();
const path = require('path');
const { logAction } = require('../../utils/logger');
const sequelize = require('../config/database');

// Chemin vers le fichier dashboard.html pour les étudiants
const dashboardPath = path.join(__dirname, '../../public/etudiant/dashboard.html');

// Route pour afficher le tableau de bord de l'étudiant
router.get('/dashboard', (req, res) => {
  const userId = 1; // Remplace par l'ID de l'utilisateur connecté
  logAction(userId, 'Accès au tableau de bord étudiant');
  res.sendFile(dashboardPath);
});

// Route pour obtenir la liste des événements
router.get('/events', async (req, res) => {
  const userId = 1; // Remplace par l'ID de l'utilisateur connecté
  logAction(userId, 'Liste des événements demandée');

  try {
    const events = await sequelize.query('SELECT * FROM evenements', { type: sequelize.QueryTypes.SELECT });
    res.json(events);
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
  }
});

// Route pour s'inscrire à un événement
router.post('/events/:id/register', async (req, res) => {
  const userId = 1; // Remplace par l'ID de l'utilisateur connecté
  const eventId = req.params.id;
  logAction(userId, `Inscription à l'événement ${eventId}`);

  try {
    // Vérifie si l'étudiant est déjà inscrit à cet événement en utilisant une requête SQL brute
    const [results] = await sequelize.query(
      'SELECT COUNT(*) as count FROM inscriptions WHERE etudiant_id = ? AND evenement_id = ?',
      {
        replacements: [userId, eventId],
        type: sequelize.QueryTypes.SELECT
      }
    );

    // Vérifie que results est défini et contient un objet avec la propriété count
    if (!results || !results[0]) {
      throw new Error("Erreur lors de la vérification de l'inscription");
    }

    const inscriptionCount = results[0].count;

    if (inscriptionCount > 0) {
      return res.status(400).json({ success: false, message: 'Vous êtes déjà inscrit à cet événement' });
    }

    // Crée une nouvelle inscription
    await sequelize.query(
      'INSERT INTO inscriptions (etudiant_id, evenement_id, date_inscription) VALUES (?, ?, NOW())',
      {
        replacements: [userId, eventId],
        type: sequelize.QueryTypes.INSERT
      }
    );

    res.json({ success: true, message: `Inscription à l'événement ${eventId} réussie` });
  } catch (error) {
    console.error('Erreur lors de l\'inscription à l\'événement:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription à l\'événement' });
  }
});

module.exports = router;
