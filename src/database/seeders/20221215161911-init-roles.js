'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [
      {
        rol: 'super',
        descripcion: 'super admin user',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        rol: 'editor',
        descripcion: 'editor user',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
