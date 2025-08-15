const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Importe les modèles
const Evenement = require('./Evenement')(sequelize, DataTypes);
const Inscription = require('./Inscription')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Evenement,
  Inscription
};
