'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ContratoGenerals', [
      {
        cod_contrato: 'AAA-000',
        descripcion: 'Bariloche- 7 noches - Hotel 3 estrellas',
        valor_contrato: '150000',
        fecha_viaje: '2023-12-08',
        cupo_pasajeros: '55',
        grado: '9',
        division: 'A',
        turno: 'Mañana',
        estado: 'pendiente',
        id_institucion: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cod_contrato: 'BBB-000',
        descripcion: 'Cataratas del Iguazú - 7 noches - Hotel 3 estrellas',
        valor_contrato: '100000',
        fecha_viaje: '2023-09-08',
        cupo_pasajeros: '55',
        grado: '8',
        division: 'B',
        turno: 'Tarde',
        estado: 'pendiente',
        id_institucion: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cod_contrato: 'CCC-000',
        descripcion: 'Bariloche- 7 noches - Hotel 3 estrellas',
        valor_contrato: '150000',
        fecha_viaje: '2023-10-10',
        cupo_pasajeros: '50',
        grado: '9',
        division: 'C',
        turno: 'Mañana',
        estado: 'pendiente',
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
