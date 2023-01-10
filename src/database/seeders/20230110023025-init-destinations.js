'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('TravelDestinations',
      [
        {
          destination: 'Cataratas del Iguazu',
          description: 'Misiones - Iguazu - Cataratas',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          destination: 'Concepcion de las Sierra',
          description: 'Misiones - Concepcion de la Sierra',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          destination: 'Salto Oasis',
          description: 'Misiones - Alem - Oasis',
          created_at: new Date(),
          updated_at: new Date()
        },

      ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('TravelDestinations', null, {});
  }
};
