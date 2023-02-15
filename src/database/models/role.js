module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    'Role', //alias
    {
      //table structure
      name: {
        type: DataTypes.STRING(25),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      //configs
      tablename: 'roles',
      Timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    }
  );

  role.associate = (models) => {
    role.hasMany(models.User, {
      as: 'users', //relation name
      foreignKey: 'id_role'
    });
  };

  return role;
};
