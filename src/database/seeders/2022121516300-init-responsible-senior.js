'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Responsables', [
      {
        nombre: 'Juna Carlos',
        apellido: 'García',
        documento: '28126367',
        fecha_nac: '1980-08-29',
        email: 'juancarlos@garcia.com',
        telefono: '3516114150',
        direccion: 'Lima 890',
        ciudad: 'Córdoba',
        provincia: 'Córdoba',
        codigo_postal: '5000',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Responsables', null, {});
  }
};
