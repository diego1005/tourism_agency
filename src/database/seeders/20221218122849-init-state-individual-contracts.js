'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('StateContracts',
      [
        {
          state: 'Cancelado',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          state: 'Saldo Pendiente',
          created_at: new Date(),
          updated_at: new Date()
        },
      ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('StateContracts', null, {});
  }
};
