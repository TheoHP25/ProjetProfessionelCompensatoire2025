const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'gestion_evenements',
  'utilisateur',
  'pass',
  {
    host: 'localhost',  
    dialect: 'mysql',
    logging: false
  }
);

module.exports = sequelize;
