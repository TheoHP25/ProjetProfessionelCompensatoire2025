const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/Utilisateur');
const authMiddleware = require('../middleware/auth');
const { logAction } = require('../../utils/logger');

// Applique le middleware d'autorisation avec le rôle 'admin'
router.use(authMiddleware(['admin']));

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

      // Assure-toi que req.user est défini et contient l'ID de l'utilisateur
      if (req.user && req.user.id) {
        logAction(req.user.id, 'Modification du rôle', `Rôle de l'utilisateur ${req.params.id} modifié en ${role}`);
      } else {
        console.error('Utilisateur non authentifié');
      }

      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du rôle de l\'utilisateur' });
  }
});

module.exports = router;
