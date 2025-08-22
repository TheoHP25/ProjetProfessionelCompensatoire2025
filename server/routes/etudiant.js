const express = require('express');
const router = express.Router();
const path = require('path');
const { logAction } = require('../../utils/logger');
const sequelize = require('../config/database');
const { sendEmail } = require('../config/mailer');

// Chemin vers le fichier dashboard.html pour les étudiants
const dashboardPath = path.join(__dirname, '../../public/etudiant/dashboard.html');

// Route pour afficher le tableau de bord de l'étudiant
router.get('/dashboard', (req, res) => {
  res.sendFile(dashboardPath);
});

// Route pour obtenir la liste des événements
router.get('/events', async (req, res) => {
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
  const userEmail = req.body.email; // L'email de l'utilisateur est envoyé depuis le frontend
  const eventId = req.params.id;

  if (!userEmail) {
    return res.status(400).json({ success: false, message: 'Email est requis' });
  }

  logAction(userEmail, `Inscription à l'événement ${eventId}`);

  try {
    // Vérifie si l'utilisateur est déjà inscrit à cet événement avec cet email
    const results = await sequelize.query(
      'SELECT 1 FROM inscriptions WHERE etudiant_mail = ? AND evenement_id = ? LIMIT 1',
      {
        replacements: [userEmail, eventId],
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (results && results.length > 0) {
      return res.status(400).json({ success: false, message: 'Vous êtes déjà inscrit à cet événement avec cet email' });
    }

    // Crée une nouvelle inscription
    await sequelize.query(
      'INSERT INTO inscriptions (etudiant_mail, evenement_id, date_inscription) VALUES (?, ?, NOW())',
      {
        replacements: [userEmail, eventId],
        type: sequelize.QueryTypes.INSERT
      }
    );

    // Envoie un email de confirmation
    await sendEmail(userEmail, 'Confirmation d\'inscription à un événement', `Bonjour,\n\nVous êtes inscrit à l'événement avec succès.\n\nCordialement,\nL'équipe de la plateforme`);

    res.json({ success: true, message: `Inscription à l'événement ${eventId} réussie` });
  } catch (error) {
    console.error('Erreur lors de l\'inscription à l\'événement:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription à l\'événement' });
  }
});

module.exports = router;
