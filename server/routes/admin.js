const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/Utilisateur');
const Log = require('../models/Log');

// Route pour le tableau de bord de l'administrateur
router.get('/dashboard', (req, res) => {
  res.send('Tableau de bord de l\'administrateur');
});

// Obtenir tous les utilisateurs
router.get('/users', async (req, res) => {
  try {
    const users = await Utilisateur.findAll();
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// Mettre à jour le rôle d'un utilisateur
router.patch('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    const [updated] = await Utilisateur.update({ role }, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedUser = await Utilisateur.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du rôle de l\'utilisateur' });
  }
});

// Obtenir tous les journaux
router.get('/logs', async (req, res) => {
  try {
    const logs = await Log.findAll({ order: [['date_action', 'DESC']] });
    res.json(logs);
  } catch (error) {
    console.error('Erreur lors de la récupération des journaux:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des journaux' });
  }
});

module.exports = router;
