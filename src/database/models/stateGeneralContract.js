module.exports = (sequelize, DataTypes) => {
    const stateGeneralContract = sequelize.define(
        "StateGeneralContract", //alias
        {   //table structure
            state: {
                type: DataTypes.TEXT,
                allowNull: false,
            }
        },
        {   //configs
            tablename: "state_general_contracts",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    stateGeneralContract.associate = (models) => {
        stateGeneralContract.belongsTo
            (
                models.GeneralContract,
                {
                    as: "general_contract",  //relation name
                    foreignKey: "id_state_general_contract"
                }
            )
    }

    return stateGeneralContract;
}