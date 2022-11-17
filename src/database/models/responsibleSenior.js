module.exports = (sequelize, DataTypes) => {
    const responsibleSenior = sequelize.define(
        "ResponsibleSenior", //alias
        {   //table structure
            dni: {
                type: DataTypes.STRING(11),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            birth_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING(12),
                allowNull: false,
            }
        },
        {   //configs
            tablename: "resposible_senior",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    responsibleSenior.associate = (models) => {
        responsibleSenior.belongsToMany
            (
                models.GeneralContract,
                {
                    through: "responsible_general_contracts",  //relation name
                    foreignKey: "id_responsible_general_contracts"
                }
            )
    }

    return responsibleSenior;
}