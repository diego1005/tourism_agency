module.exports = (sequelize, DataTypes) => {
    const contract = sequelize.define(
        "Contract", //alias
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
        },
        {   //configs
            tablename: "contracts",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    contract.associate = (models) => {
        contract.hasOne
            (
                models.IndividualContract,
                {
                    foreignKey: "id_contract",
                }
            );
        contract.hasOne
            (
                models.GeneralContract,
                {
                    foreignKey: "id_contract",
                }
            );
    }
    return contract;
}
