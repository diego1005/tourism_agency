module.exports = (sequelize, DataTypes) => {
    const individualContract = sequelize.define(
        "IndividualContract", //alias
        {   //table structure
            nro_contract: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            indicated_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            indicated_value: {
                type: DataTypes.DECIMAL(8, 2),
                allowNull: false,
            },
            payment_method: {
                type: DataTypes.STRING(25),
                allowNull: false,
            }
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
                    foreignKey: "id_user"
                }
            ),
            individualContract.hasMany
                (
                    models.Student,
                    {
                        as: "students",
                        foreignKey: "id_student"
                    }
                ),
            individualContract.hasMany
                (
                    models.Fee,
                    {
                        as: "fees",
                        foreignKey: "id_fee"
                    }
                ),
            individualContract.belongsTo
                (
                    models.StateContract,
                    {
                        as: "state_individual_contract",
                        foreignKey: "id_state_individual_contract"
                    }
                ),
            individualContract.belongsTo
                (
                    models.GeneralContract,
                    {
                        as: "general_contract",
                        foreignKey: "id_general_contract"
                    }
                )
    }

    return individualContract;
}