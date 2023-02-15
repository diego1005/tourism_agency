module.exports = (sequelize, DataTypes) => {
  const tourPackage = sequelize.define(
    'TourPackage', //alias
    {
      //table structure
      name: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      //configs
      tablename: 'tour_package',
      Timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    }
  );

  tourPackage.associate = (models) => {
    /* tourPackage.hasMany(models.GeneralContract, {
      as: 'general_contracts', //relation name
      foreignKey: 'id_tour_package'
    }); */
  };

  return tourPackage;
};
