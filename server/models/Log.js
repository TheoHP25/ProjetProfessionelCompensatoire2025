const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://utilisateur:pass@localhost:3306/gestion_evenements');

const Log = sequelize.define('Log', {
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Utilisateurs',
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
  tableName: 'logs',
  timestamps: false
});

module.exports = Log;
