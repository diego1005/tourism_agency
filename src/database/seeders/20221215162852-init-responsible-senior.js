'use strict';

const bcrypt = require('../../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ResponsibleSeniors', [
      {
        firstname: 'Papá de Ana y Lucas',
        lastname: 'García',
        document: '28126367',
        birthdate: new Date(),
        email: 'papadeanaylucas@garcia.com',
        phone: '3516114150',
        address: 'Lima 890',
        city: 'Salta',
        province: 'Salta',
        postalcode: '5000',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ResponsibleSeniors', null, {});
  }
};
