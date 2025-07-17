const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Utilisateur = require('../models/Utilisateur');

// Route pour l'inscription
router.post('/inscription', async (req, res) => {
  try {
    const { nom, email, mot_de_passe, role } = req.body;
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    const nouvelUtilisateur = await Utilisateur.create({
      nom,
      email,
      mot_de_passe: hashedPassword,
      role
    });

    res.status(201).json(nouvelUtilisateur);
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).send('Erreur serveur');
  }
});

const jwt = require('jsonwebtoken');

// Route pour la connexion
router.post('/connexion', async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    const utilisateur = await Utilisateur.findOne({ where: { email } });

    if (!utilisateur) {
      return res.status(404).send('Utilisateur non trouvé');
    }

    const motDePasseValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!motDePasseValide) {
      return res.status(401).send('Mot de passe invalide');
    }

    const token = jwt.sign({ id: utilisateur.id, role: utilisateur.role }, 'ton_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
