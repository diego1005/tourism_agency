'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('PaymentMethods',
      [
        {
          payment: 'Efectivo',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          payment: 'Tarjeta de Débito',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          payment: 'Tarjeta de Crédito',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          payment: 'Mercado Pago',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          payment: 'Cuenta Corriente',
          created_at: new Date(),
          updated_at: new Date()
        },
      ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PaymentMethods', null, {});
  }
};
