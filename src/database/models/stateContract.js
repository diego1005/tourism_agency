module.exports = (sequelize, DataTypes) => {
    const stateContract = sequelize.define(
        "StateContract", //alias
        {   //table structure
            description: DataTypes.TEXT,
        },
        {   //configs
            tablename: "stateContracts",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    stateContract.associate = (models) => {
        stateContract.belongsTo
        (
            models.IndividualContract,
            {
                as: "individualContract",  //relation name
                foreignKey: "idStateContract"
            }
        ),
        stateContract.belongsTo
        (
            models.GeneralContract,
            {
                as: "generalContract",  //relation name
                foreignKey: "idStateContract"
            }
        )
    }

    return stateContract;
}