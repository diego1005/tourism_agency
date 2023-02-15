'use strict';

const bcrypt = require('../../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Students', [
      {
        firstname: 'Ana',
        lastname: 'García',
        document: '63000111',
        birthdate: new Date(),
        email: 'ana@garcia.com',
        phone: '3514564940',
        id_responsible_senior: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        firstname: 'Lucas',
        lastname: 'García',
        document: '63000222',
        birthdate: new Date(),
        email: 'lucas@garcia.com',
        phone: '3514564715',
        id_responsible_senior: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Students', null, {});
  }
};
