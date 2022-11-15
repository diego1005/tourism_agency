module.exports = (sequelize, DataTypes) => {
    const generalContract = sequelize.define(
        "GeneralContract", //alias
        {   //table structure

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
                models.TravelDestination,
                {
                    as: "travelDestination",  //relationship name
                    foreignKey: "idTravelDestination"
                }
            ),
            generalContract.belongsTo
                (
                    models.StateContract,
                    {
                        as: "stateContract",
                        foreignKey: "idStateContract"
                    }
                ),
            generalContract.hasMany
                (
                    models.IndividualContract,
                    {
                        as: "individualContracts",
                        foreignKey: "idIndividualContract"
                    }
                ),
            generalContract.belongsToMany
                (
                    models.ResponsibleSenior,
                    {
                        through: "responsible_generalContracts",  //relation name
                        foreignKey: "idResponsible_generalContracts"
                    }
                )
    }

    return generalContract;
}