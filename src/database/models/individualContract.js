module.exports = (sequelize, DataTypes) => {
    const individualContract = sequelize.define(
        "IndividualContract", //alias
        {   //table structure
            nro_contract: DataTypes.INTEGER,
            indicated_date: DataTypes.DATE,
            indicated_value: DataTypes.DECIMAL(8, 2),
        },
        {   //configs
            tablename: "individual_contracts",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    individualContract.associate = (models) => {
        individualContract.belongsTo
            (
                models.User,
                {
                    as: "user",  //relationship name
                    foreignKey: "idUser"
                }
            ),
            individualContract.hasMany
                (
                    models.Student,
                    {
                        as: "students",
                        foreignKey: "idStudent"
                    }
                ),
            individualContract.hasMany
                (
                    models.Fee,
                    {
                        as: "fees",
                        foreignKey: "idFee"
                    }
                )
    }

    return individualContract;
}