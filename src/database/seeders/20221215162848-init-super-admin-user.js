'use strict';

const bcrypt = require('../../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'super',
        apellido: 'admin',
        email: 'super@admin.com',
        password: await bcrypt.hash('super33'),
        id_rol: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'editor',
        apellido: 'admin',
        email: 'editor@admin.com',
        password: await bcrypt.hash('super33'),
        id_rol: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};
