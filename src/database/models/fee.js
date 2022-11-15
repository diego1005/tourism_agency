module.exports = (sequelize, DataTypes) => {
    const fee = sequelize.define(
        "Fee", //alias
        {   //table structure
            nro_fee: DataTypes.INTEGER(2),
            first_expired_date: DataTypes.DATE,
            last_expired_date: DataTypes.DATE,
            first_expired_value: DataTypes.DECIMAL(8, 2),
            last_expired_value: DataTypes.DECIMAL(8, 2),
        },
        {   //configs
            tablename: "fees",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    fee.associate = (models) => {
        fee.belongsTo
        (
            models.IndividualContract,
            {
                as: "individualContract",  //relation name
                foreignKey: "idFee"
            }
        )
    }

    return fee;
}