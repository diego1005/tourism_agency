module.exports = (sequelize, DataTypes) => {
  const city = sequelize.define(
    'City', //alias
    {
      //table structure
      name: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    },
    {
      //configs
      tablename: 'cities',
      Timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    }
  );

  city.associate = (models) => {
    city.belongsTo(models.Province, {
      as: 'province',
      foreignKey: 'id_province'
    });
  };

  return city;
};
