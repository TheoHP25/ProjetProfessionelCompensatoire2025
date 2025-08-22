module.exports = (sequelize, DataTypes) => {
  const Evenement = sequelize.define('Evenement', {
    titre: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false
    },
    organisateur_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'evenements',
    timestamps: false
  });

  return Evenement;
};
