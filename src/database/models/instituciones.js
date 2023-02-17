module.exports = (sequelize, DataTypes) => {
    const institucion = sequelize.define(
        'Institucion', //alias
        {
            //table structure
            nombre: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            direccion: {
                type: DataTypes.STRING(150),
                allowNull: false
            },
            telefono: {
                type: DataTypes.STRING(14),
                allowNull: false
            },
            localidad: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
        },
        {
            //configs
            tablename: 'instituciones',
            Timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: false
        }
    );

    institucion.associate = (models) => {
        institucion.hasMany(models.ContratoGeneral, {
            as: 'contratosGenerales', //relation name
            foreignKey: 'id_contrato_general'
        });
    };

    return institucion;
};
