'use strict';

const bcrypt = require('../../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cities', [
      {
        name: 'Santa Rosa del Conlara',
        id_province: 19,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Villa de Merlo',
        id_province: 19,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cities', null, {});
  }
};
