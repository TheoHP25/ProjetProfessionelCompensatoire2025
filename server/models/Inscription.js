module.exports = (sequelize, DataTypes) => {
  const Inscription = sequelize.define('Inscription', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    etudiant_mail: {  
      type: DataTypes.STRING,  
      allowNull: false,
      field: 'etudiant_mail'
    },
    evenement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'evenement_id'
    },
    date_inscription: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'date_inscription'
    }
  }, {
    tableName: 'inscriptions',
    timestamps: false
  });

  return Inscription;
};
