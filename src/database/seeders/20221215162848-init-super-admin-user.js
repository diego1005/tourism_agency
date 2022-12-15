'use strict';

const bcrypt = require('../../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users',
      [
        {
          firstname: 'super',
          lastname: 'admin',
          email: "super@admin.com",
          password: await bcrypt.hash("super33"),
          id_role: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
      ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
