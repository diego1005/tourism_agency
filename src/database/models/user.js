module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'User', //alias
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
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false
      }
    },
    {
      //configs
      tablename: 'users',
      Timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    }
  );

  user.associate = (models) => {
    /* user.hasOne(models.Student, {
      foreignKey: 'id_user'
    });
    user.hasMany(models.IndividualContract, {
      as: 'individual_contracts', //relation name
      foreignKey: 'id_user'
    }), */
    user.belongsTo(models.Role, {
      as: 'role',
      foreignKey: 'id_role'
    });
  };

  return user;
};
