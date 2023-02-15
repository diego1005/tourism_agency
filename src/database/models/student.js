module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define(
    'Student', //alias
    {
      //table structure
      firstname: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      document: {
        type: DataTypes.STRING(11),
        allowNull: false
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING(12),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(12),
        allowNull: true
      },
      info: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      //configs
      tablename: 'students',
      Timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    }
  );

  student.associate = (models) => {
    student.belongsTo(models.ResponsibleSenior, {
      as: 'responsible_senior',
      foreignKey: 'id_responsible_senior'
    });
  };

  return student;
};
