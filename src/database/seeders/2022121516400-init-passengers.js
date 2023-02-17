'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Pasajeros', [
      {
        nombre: 'Ana',
        apellido: 'García',
        documento: '63000111',
        fecha_nac: '2010-10-06',
        obs_medicas: 'Alérgica',
        id_responsable: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Lucas',
        apellido: 'García',
        documento: '63000222',
        fecha_nac: '2010-10-06',
        obs_medicas: '',
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
