const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://utilisateur:pass@localhost:3306/gestion_evenements');

const Evenement = sequelize.define('Evenement', {
  titre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  lieu: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  organisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'evenements', // Nom exact de la table dans la base de données
  timestamps: false // Désactive les champs createdAt et updatedAt si tu ne les utilises pas
});

module.exports = Evenement;
