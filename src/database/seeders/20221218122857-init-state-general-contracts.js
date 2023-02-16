'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('StateGeneralContracts',
      [
        {
          state: 'Pendiente',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          state: 'Realizado',
          created_at: new Date(),
          updated_at: new Date()
        },
      ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('StateGeneralContracts', null, {});
  }
};
