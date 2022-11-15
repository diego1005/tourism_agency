module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        "User", //alias
        {   //table structure
            username: DataTypes.STRING(45),
            password: DataTypes.STRING(45)
        },
        {   //configs
            tablename: "users",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    user.associate = (models) => {
        user.hasMany
            (
                models.IndividualContract,
                {
                    as: "individualContracts",  //relation name
                    foreignKey: "idUser"
                }
            )
    }

    return user;
}