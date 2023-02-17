module.exports = (sequelize, DataTypes) => {
  const pasajero = sequelize.define(
    'Pasajero', //alias
    {
      //table structure
      nombre: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      apellido: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      documento: {
        type: DataTypes.STRING(11),
        allowNull: false
      },
      fecha_nac: {
        type: DataTypes.DATE,
        allowNull: false
      },
      obs_medicas: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      //configs
      tablename: 'pasajeros',
      Timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    }
  );

  pasajero.associate = (models) => {
    pasajero.belongsTo(models.Responsable, {
      as: 'responsable',
      foreignKey: 'id_responsable'
    });
    pasajero.hasMany(models.ContratoIndividual, {
      as: 'contratos_individuales',
      foreignKey: 'id_contrato_individual'
    });
  };

  return pasajero;
};
