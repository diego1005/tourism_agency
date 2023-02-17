'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Responsables', [
      {
        nombre: 'Papá de Ana y Lucas',
        apellido: 'García',
        documento: '28126367',
        fecha_nac: new Date(),
        email: 'papadeanaylucas@garcia.com',
        telefono: '3516114150',
        direccion: 'Lima 890',
        ciudad: 'Salta',
        provincia: 'Salta',
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
