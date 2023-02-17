module.exports = (sequelize, DataTypes) => {
  const responsable = sequelize.define(
    'Responsable', //alias
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
      email: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      telefono: {
        type: DataTypes.STRING(14),
        allowNull: false
      },
      direccion: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      ciudad: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      provincia: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      codigo_postal: {
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
      tablename: 'responsables',
      Timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    }
  );

  responsable.associate = (models) => {
    responsable.hasMany(models.Pasajero, {
      as: 'pasajeros', //relation name
      foreignKey: 'id_responsable',
      onDelete: 'cascade'
    });
  };

  return responsable;
};
