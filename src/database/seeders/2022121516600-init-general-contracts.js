'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ContratoGenerals', [
      {
        cod_contrato: 'AAA-000',
        descripcion: 'Cataratas del Iguazú - 7 noches - Hotel 3 estrellas',
        fecha_contrato: new Date(),
        valor_contrato: '100000',
        fecha_viaje: '2023-12-08',
        cupo_pasajeros: '55',
        grado: '9',
        division: 'A',
        turno: 'M',
        estado: 'Pendiente',
        id_institucion: '1',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ContratoGenerals', null, {});
  }
};
