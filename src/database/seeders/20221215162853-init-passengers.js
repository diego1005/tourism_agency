'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Pasajeros', [
      {
        nombre: 'Ana',
        apellido: 'García',
        documento: '63000111',
        fecha_nac: new Date(),
        obs_medicas: 'Sancor Salud',
        id_responsable: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Lucas',
        apellido: 'García',
        documento: '63000222',
        fecha_nac: new Date(),
        obs_medicas: 'Sancor Salud',
        id_responsable: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Pasajeros', null, {});
  }
};
