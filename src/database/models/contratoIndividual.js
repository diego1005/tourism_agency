module.exports = (sequelize, DataTypes) => {
  const contratoIndividual = sequelize.define(
    'ContratoIndividual', //alias
    {
      //table structure
      fecha_contrato: {
        type: DataTypes.DATE,
        allowNull: false
      },
      valor_contrato: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
      },
      saldo: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
      },
      estado: {
        type: DataTypes.ENUM('Pendiente', 'Saldado'),
        allowNull: false
      },
      ficha_medica: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      //configs
      tablename: 'contratos_individuales',
      Timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    }
  );

  contratoIndividual.associate = (models) => {
    contratoIndividual.belongsTo(models.Pasajero, {
      as: 'pasajero', //relationship name
      foreignKey: 'id_contrato_individual'
    });
    contratoIndividual.belongsTo(models.ContratoGeneral, {
      as: 'contrato_general',
      foreignKey: 'id_contrato_general'
    });
  };

  return contratoIndividual;
};
