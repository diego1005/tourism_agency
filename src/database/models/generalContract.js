module.exports = (sequelize, DataTypes) => {
    const generalContract = sequelize.define(
        "GeneralContract", //alias
        {   //table structure
            nro_contract: DataTypes.INTEGER,
            indicated_date: DataTypes.DATE,
            indicated_value: DataTypes.DECIMAL(11, 2),
            travel_date: DataTypes.DATE,
        },
        {   //configs
            tablename: "generalContracts",
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