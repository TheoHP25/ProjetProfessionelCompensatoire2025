const express = require('express');
const router = express.Router();
const path = require('path');
const checkRole = require('../middleware/checkRole');

// Applique le middleware de vérification de rôle pour vérifier que l'utilisateur est soit admin soit organisateur
router.use(checkRole(['admin', 'organisateur']));

// Route pour afficher le tableau de bord de l'organisateur
router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/organisateur/dashboard.html'));
});


// Créer un événement
router.post('/events', async (req, res) => {
  try {
    const { titre, description, date, lieu } = req.body;

    const event = await Evenement.create({
      titre,
      description,
      date,
      lieu,
      organisateur_id: req.user.id
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'événement' });
  }
});

module.exports = router;
