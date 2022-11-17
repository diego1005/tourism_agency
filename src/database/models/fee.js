module.exports = (sequelize, DataTypes) => {
    const fee = sequelize.define(
        "Fee", //alias
        {   //table structure
            financing: {
                type: DataTypes.INTEGER(2),
                allowNull: false,
            },
            first_expired_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            last_expired_date: DataTypes.DATE,
            first_expired_value: {
                type: DataTypes.DECIMAL(8, 2),
                allowNull: false,
            },
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
                    as: "individual_contract",  //relation name
                    foreignKey: "id_fee"
                }
            )
    }

    return fee;
}