module.exports = (sequelize, DataTypes) => {
    const travel_destination = sequelize.define(
        "Travel_destination", //alias
        {   //table structure
            name: DataTypes.STRING(45),
            description: DataTypes.TEXT,
        },
        {   //configs
            tablename: "travel_destinations",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    travel_destination.associate = (models) => {
        travel_destination.hasMany
        (
            models.GeneralContract,
            {
                as: "generalContracts",  //relation name
                foreignKey: "idTravelDestination"
            }
        )
    }

    return travel_destination;
}