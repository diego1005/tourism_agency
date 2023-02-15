'use strict';

const bcrypt = require('../../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('TourPackages', [
      {
        name: 'Cataratas del Iguazu',
        description: 'Misiones - Iguazu - Cataratas',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Concepcion de las Sierra',
        description: 'Misiones - Concepcion de la Sierra',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Salto Oasis',
        description: 'Misiones - Alem - Oasis',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('TourPackages', null, {});
  }
};
