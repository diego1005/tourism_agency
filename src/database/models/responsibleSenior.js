module.exports = (sequelize, DataTypes) => {
    const responsibleSenior = sequelize.define(
        "ResponsibleSenior", //alias
        {   //table structure
            dni: DataTypes.STRING(11),
            name: DataTypes.STRING(45),
            lastname: DataTypes.STRING(45),
            birth_date: DataTypes.DATE,
        },
        {   //configs
            tablename: "responsiblSeniors",
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
                    through: "responsible_generalContracts",  //relation name
                    foreignKey: "idResponsible_generalContracts"
                }
            )
    }

    return responsibleSenior;
}