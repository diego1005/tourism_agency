'use strict';

const bcrypt = require('../../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Provinces', [
      {
        name: 'Ciudad Autónoma de Buenos Aires',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Buenos Aires',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Catamarca',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Chaco',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Chubut',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Córdoba',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Corrientes',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Entre Ríos',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Formosa',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Jujuy',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'La Pampa',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'La Rioja',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Mendoza',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Misiones',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Neuquén',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Río Negro',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Salta',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'San Juan',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'San Luis',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'SAnta Cruz',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Santa Fe',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Santiago del Estero',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tierra del Fuego',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tucumán',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
