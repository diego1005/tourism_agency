module.exports = (sequelize, DataTypes) => {
    const travelDestination = sequelize.define(
        "TravelDestination", //alias
        {   //table structure
            name: DataTypes.STRING(45),
            description: DataTypes.TEXT,
        },
        {   //configs
            tablename: "travelDestinations",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    travelDestination.associate = (models) => {
        travelDestination.hasMany
        (
            models.GeneralContract,
            {
                as: "generalContracts",  //relation name
                foreignKey: "idTravelDestination"
            }
        )
    }

    return travelDestination;
}