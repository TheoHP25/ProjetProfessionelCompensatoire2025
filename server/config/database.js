const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql', // ou 'sqlite', 'postgres', etc.
  host: 'localhost',
  database: 'gestion_evenements',
  username: 'utilisateur',
  password: 'pass',
  logging: false // Désactive les logs SQL si nécessaire
});

module.exports = sequelize;
