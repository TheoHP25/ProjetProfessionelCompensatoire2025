const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://utilisateur:pass@localhost:3306/gestion_evenements');

const Utilisateur = sequelize.define('Utilisateur', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'organisateur', 'etudiant'),
    allowNull: false
  }
});

module.exports = Utilisateur;
