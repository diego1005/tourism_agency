module.exports = (sequelize, DataTypes) => {
    const stateContract = sequelize.define(
        "StateContract", //alias
        {   //table structure
            state: {
                type: DataTypes.TEXT,
                allowNull: false,
            }
        },
        {   //configs
            tablename: "state_individual_contracts",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    stateContract.associate = (models) => {
        stateContract.hasMany
            (
                models.IndividualContract,
                {
                    as: "state_individual_contracts",  //relation name
                    foreignKey: "id_state_individual_contract"
                }
            )
    }

    return stateContract;
}