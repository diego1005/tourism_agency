module.exports = (sequelize, DataTypes) => {
    const generalContract = sequelize.define(
        "GeneralContract", //alias
        {   //table structure
            travel_date: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        },
        {   //configs
            tablename: "general_contracts",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    generalContract.associate = (models) => {
        generalContract.belongsTo
            (
                models.Contract,
                {
                    foreignKey: "id_contract",
                }
            );
        generalContract.belongsTo
            (
                models.TravelDestination,
                {
                    as: "travel_destination",  //relationship name
                    foreignKey: "id_travel_destination"
                }
            );
        generalContract.belongsTo
            (
                models.StateGeneralContract,
                {
                    as: "state_general_contract",
                    foreignKey: "id_state_general_contract"
                }
            );
        generalContract.hasMany
            (
                models.IndividualContract,
                {
                    as: "individual_contracts",
                    foreignKey: "id_individual_contract"
                }
            );
        generalContract.belongsToMany
            (
                models.ResponsibleSenior,
                {
                    through: "responsible_general_contracts",  //relation name
                    foreignKey: "id_responsible_general_contracts"
                }
            );
    }

    return generalContract;
}