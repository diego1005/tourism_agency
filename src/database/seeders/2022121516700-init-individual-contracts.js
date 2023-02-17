'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ContratoIndividuals', [
      {
        cod_contrato: 'AAA-000/63000111',
        fecha_contrato: '2023-02-20',
        valor_contrato: 90000,
        pagos: 0,
        estado: 'Pendiente',
        id_contrato_general: '1',
        id_pasajero: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cod_contrato: 'AAA-000/63000222',
        fecha_contrato: '2023-02-20',
        valor_contrato: 90000,
        pagos: 0,
        estado: 'Pendiente',
        id_contrato_general: '1',
        id_pasajero: '2',
        updated_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ContratoIndividuals', null, {});
  }
};
