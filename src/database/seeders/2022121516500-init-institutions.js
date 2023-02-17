'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Institucions', [
      {
        nombre: 'Colegio San Carlos',
        direccion: 'Roma 358',
        telefono: '3517564940',
        localidad: 'Córdoba',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Institucions', null, {});
  }
};
