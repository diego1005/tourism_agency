module.exports = (sequelize, DataTypes) => {
  const travelDestination = sequelize.define(
    'TravelDestination', //alias
    {
      //table structure
      destination: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      //configs
      tablename: 'travel_destinations',
      Timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    }
  );

  travelDestination.associate = (models) => {
    travelDestination.hasMany(models.GeneralContract, {
      as: 'general_contracts', //relation name
      foreignKey: 'id_travel_destination'
    });
  };

  return travelDestination;
};
