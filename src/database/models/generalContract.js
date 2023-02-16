module.exports = (sequelize, DataTypes) => {
  const generalContract = sequelize.define(
    'GeneralContract', //alias
    {
      //table structure
      travel_date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      //configs
      tablename: 'general_contracts',
      Timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false
    }
  );

  generalContract.associate = (models) => {
    generalContract.hasOne(models.Contract, {
      as: 'gen_contract',
      foreignKey: 'id_gen_contract'
    });
    generalContract.belongsTo(models.TourPackage, {
      as: 'tour_package', //relationship name
      foreignKey: 'id_tour_package'
    });
    generalContract.belongsTo(models.StateGeneralContract, {
      as: 'state_general_contracts',
      foreignKey: 'id_state_general_contract'
    });
    generalContract.hasMany(models.IndividualContract, {
      as: 'individual_contracts',
      foreignKey: 'id_individual_contract'
    });
    generalContract.belongsToMany(models.ResponsibleSenior, {
      through: 'responsible_general_contracts', //relation name
      foreignKey: 'id_responsible_general_contracts'
    });
  };

  return generalContract;
};
