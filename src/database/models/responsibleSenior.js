module.exports = (sequelize, DataTypes) => {
    const responsible_senior = sequelize.define(
        "ResponsibleSenior", //alias
        {   //table structure
            dni: DataTypes.STRING(11),
            name: DataTypes.STRING(45),
            lastname: DataTypes.STRING(45),
            birth_date: DataTypes.DATE,
        },
        {   //configs
            tablename: "responsible_seniors",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    responsible_senior.associate = (models) => {
        responsible_senior.belongsToMany
            (
                models.GeneralContract,
                {
                    through: "responsible_generalContracts",  //relation name
                    foreignKey: "idResponsible_generalContracts"
                }
            )
    }

    return responsible_senior;
}