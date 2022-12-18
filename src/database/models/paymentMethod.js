module.exports = (sequelize, DataTypes) => {
    const paymentMethod = sequelize.define(
        "PaymentMethod", //alias
        {   //table structure
            payment: {
                type: DataTypes.STRING(25),
                allowNull: false,
            }
        },
        {   //configs
            tablename: "payment_method",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    paymentMethod.associate = (models) => {
        paymentMethod.hasMany
            (
                models.IndividualContract,
                {
                    as: "individual_contracts_payment",  //relation name
                    foreignKey: "id_individual_contract"
                }
            )
    }

    return paymentMethod;
}