const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'gestion_evenements',
  'utilisateur',
  'pass',
  {
    host: 'localhost',  // Utilise 'localhost' comme hôte
    dialect: 'mysql',
    logging: false
  }
);

module.exports = sequelize;
