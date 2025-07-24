const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://utilisateur:pass@localhost:3306/gestion_evenements');

const Log = sequelize.define('Log', {
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Utilisateurs', // Assure-toi que ce nom correspond au modèle Sequelize pour la table utilisateurs
      key: 'id'
    }
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_action: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'logs', // Spécifie le nom de la table existante
  timestamps: false // Désactive les champs timestamps automatiques si tu ne les utilises pas
});

module.exports = Log;
