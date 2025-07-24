const express = require('express');
const router = express.Router();

// Route pour le tableau de bord de l'administrateur
router.get('/dashboard', (req, res) => {
  res.send('Tableau de bord de l\'administrateur');
});

module.exports = router;
