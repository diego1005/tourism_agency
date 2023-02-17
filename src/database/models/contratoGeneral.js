module.exports = (sequelize, DataTypes) => {
  const contratoGeneral = sequelize.define(
    'ContratoGeneral', //alias
    {
      //table structure
      cod_contrato: {
        type: DataTypes.STRING(7),
        allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      fecha_contrato: {
        type: DataTypes.DATE,
        allowNull: false
      },
      valor_contrato: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
      },
      fecha_viaje: {
        type: DataTypes.DATE,
        allowNull: false
      },
      cupo_pasajeros: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      grado: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      division: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      turno: {
        type: DataTypes.CHAR(1),
        allowNull: false
      },
      estado: {
        type: DataTypes.ENUM('Pendiente', 'Saldado'),
        allowNull: false
      }
    },
    {
      //configs
      tablename: 'contratos_generales',
      Timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    }
  );

  contratoGeneral.associate = (models) => {
    contratoGeneral.hasMany(models.ContratoIndividual, {
      as: 'contratos_individuales',
      foreignKey: 'id_contrato_general',
      onDelete: 'cascade'
    });
    contratoGeneral.belongsToMany(models.Responsable, {
      through: 'responsables_contratos_generales', //relation name
      foreignKey: 'id_contrato_general',
    });
    contratoGeneral.belongsTo(models.Institucion, {
      as: 'institucion', //relation name
      constraints: false,
      foreignKey: 'id_institucion'
    });
  };

  return contratoGeneral;
};
