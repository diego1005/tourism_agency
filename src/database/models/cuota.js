module.exports = (sequelize, DataTypes) => {
    const cuota = sequelize.define(
        'Cuota', //alias
        {
            //table structure
            cuota: {
                type: DataTypes.INTEGER(2),
                allowNull: false
            },
            primer_venc: {
                type: DataTypes.DATE,
                allowNull: false
            },
            segundo_venc: {
                type: DataTypes.DATE,
                allowNull: false
            },
            valor_primer_venc: {
                type: DataTypes.DECIMAL(8, 2),
                allowNull: false
            },
            valor_segundo_venc: {
                type: DataTypes.DECIMAL(8, 2),
                allowNull: false
            },
            tipo_pago: {
                type: DataTypes.ENUM('Pago Total', 'Pago Parcial'),
                allowNull: false
            },
            forma_pago: {
                type: DataTypes.ENUM('Efectivo', 'Tarjeta de Credito', 'Mercado Pago'),
                allowNull: false
            },
            fecha_pago: {
                type: DataTypes.DATE,
                allowNull: false
            },
            estado: {
                type: DataTypes.ENUM('Saldado', 'Pendiente'),
                allowNull: false
            },
        },
        {
            //configs
            tablename: 'cuotas',
            Timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: false
        }
    );

    cuota.associate = (models) => {
        cuota.belongsTo(models.ContratoIndividual, {
            as: 'contrato_individual',
            foreignKey: 'id_contrato_individual'
        });
          cuota.hasOne(models.Pagos, {
            as: 'pago',
            foreignKey: 'id_pago',
          });
    };

    return cuota;
};
