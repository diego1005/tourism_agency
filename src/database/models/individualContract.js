module.exports = (sequelize, DataTypes) => {
    const individualContract = sequelize.define(
        "IndividualContract", //alias
        {   //table structure
            payment_method: {
                type: DataTypes.STRING(25),
                allowNull: false,
            }
        },
        {   //configs
            tablename: "individual_contracts",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    individualContract.associate = (models) => {
        individualContract.hasOne
            (
                models.Contract,
                {
                    as: "ind_contract",
                    foreignKey: "id_ind_contract",
                }
            )
        individualContract.belongsTo
            (
                models.User,
                {
                    as: "user",  //relationship name
                    foreignKey: "id_user"
                }
            );
        individualContract.hasMany
            (
                models.Fee,
                {
                    as: "fees",
                    foreignKey: "id_fee"
                }
            );
        individualContract.belongsTo
            (
                models.StateContract,
                {
                    as: "state_individual_contracts",
                    foreignKey: "id_state_individual_contract"
                }
            );
        individualContract.belongsTo
            (
                models.GeneralContract,
                {
                    as: "general_contract",
                    foreignKey: "id_general_contract"
                }
            );
        individualContract.belongsTo
            (
                models.PaymentMethod,
                {
                    as: "individual_contracts_payment",
                    foreignKey: "id_individual_contract_payment_method",
                }
            )
    }

    return individualContract;
}