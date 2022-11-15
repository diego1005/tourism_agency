module.exports = (sequelize, DataTypes) => {
    const state_contract = sequelize.define(
        "StateContract", //alias
        {   //table structure
            description: DataTypes.TEXT,
        },
        {   //configs
            tablename: "state_contracts",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    state_contract.associate = (models) => {
        state_contract.belongsTo
        (
            models.IndividualContract,
            {
                as: "individualContract",  //relation name
                foreignKey: "idStateContract"
            }
        ),
        state_contract.belongsTo
        (
            models.GeneralContract,
            {
                as: "generalContract",  //relation name
                foreignKey: "idStateContract"
            }
        )
    }

    return state_contract;
}