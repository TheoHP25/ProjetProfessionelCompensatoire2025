const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Route pour le tableau de bord de l'administrateur
router.get('/dashboard', authMiddleware(['admin']), (req, res) => {
  res.send('Tableau de bord de l\'administrateur');
});

module.exports = router;

