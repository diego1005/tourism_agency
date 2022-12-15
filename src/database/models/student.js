module.exports = (sequelize, DataTypes) => {
    const student = sequelize.define(
        "Student", //alias
        {   //table structure
            dni: {
                type: DataTypes.STRING(11),
                allowNull: false,
            },
            firstname: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            lastname: {
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
            tablename: "students",
            Timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false,
        },
    )

    student.associate = (models) => {
        student.belongsTo
            (
                models.IndividualContract,
                {
                    as: "individual_contract",  //relation name
                    foreignKey: "id_student"
                }
            )
    }

    return student;
}