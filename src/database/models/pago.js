module.exports = (sequelize, DataTypes) => {
    const pago = sequelize.define(
        'Pago', //alias
        {
            //table structure
            fecha_pago: {
                type: DataTypes.DATE,
                allowNull: false
            },
            importe: {
                type: DataTypes.DECIMAL(8, 2),
                allowNull: false
            },
        },
        {
            //configs
            tablename: 'pagos',
            Timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: false
        }
    );

    pago.associate = (models) => {
        pago.hasOne(models.Cuota, {
            as: 'cuota',
            foreignKey: 'id_pago'
        });
    };

    return pago;
};
