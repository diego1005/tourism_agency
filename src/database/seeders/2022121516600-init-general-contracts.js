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
        estado: 'vigente',
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
        estado: 'vigente',
        id_institucion: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cod_contrato: 'CCC-000',
        descripcion: 'Ejemplo Contrato General TERMINADO',
        valor_contrato: '90000',
        fecha_viaje: '2023-02-18',
        cupo_pasajeros: '50',
        grado: '9',
        division: 'A',
        turno: 'Mañana',
        estado: 'terminado',
        id_institucion: '2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cod_contrato: 'DDD-000',
        descripcion: 'Ejemplo Contrato General TERMINADO',
        valor_contrato: '80000',
        fecha_viaje: '2023-02-20',
        cupo_pasajeros: '45',
        grado: '7',
        division: 'D',
        turno: 'Tarde',
        estado: 'terminado',
        id_institucion: '2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cod_contrato: 'EEE-000',
        descripcion: 'Ejemplo Contrato General CANCELADO',
        valor_contrato: '77000',
        fecha_viaje: '2023-09-10',
        cupo_pasajeros: '52',
        grado: '7',
        division: 'B',
        turno: 'Mañana',
        estado: 'cancelado',
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
