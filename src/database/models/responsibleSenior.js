module.exports = (sequelize, DataTypes) => {
  const responsibleSenior = sequelize.define(
    'ResponsibleSenior', //alias
    {
      //table structure
      firstname: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      document: {
        type: DataTypes.STRING(11),
        allowNull: false
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING(14),
        allowNull: false
      },
      address: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      city: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      province: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      postalcode: {
        type: DataTypes.STRING(8),
        allowNull: false
      },
      info: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      //configs
      tablename: 'resposible_senior',
      Timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    }
  );

  responsibleSenior.associate = (models) => {
    responsibleSenior.hasMany(models.Student, {
      as: 'students', //relation name
      foreignKey: 'id_responsible_senior'
    });
  };

  return responsibleSenior;
};
