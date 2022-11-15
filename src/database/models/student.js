module.exports = (sequelize, DataTypes) => {
    const student = sequelize.define(
        "Student", //alias
        {   //table structure
            dni: DataTypes.STRING(11),
            name: DataTypes.STRING(45),
            lastname: DataTypes.STRING(45),
            birth_date: DataTypes.DATE,
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
                    as: "individualContract",  //relation name
                    foreignKey: "idStudent"
                }
            )
    }

    return student;
}