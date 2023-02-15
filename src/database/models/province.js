module.exports = (sequelize, DataTypes) => {
  const province = sequelize.define(
    'Province', //alias
    {
      //table structure
      name: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    },
    {
      //configs
      tablename: 'provinces',
      Timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    }
  );

  province.associate = (models) => {
    province.hasMany(models.City, {
      as: 'cities', //relation name
      foreignKey: 'id_province'
    });
  };

  return province;
};
