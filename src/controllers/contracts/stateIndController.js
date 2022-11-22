const { StateIndividualController } = require('../../database/models');

module.exports = {
    get: (req, res) => {
        try {
            const listStates = StateIndividualController.findAll();
            
        } catch (error) {
            
        }
    },
    getByContract: (req, res) => {

    },
    create: (req, res) => {

    },
    edit: (req, res) => {

    },
    delete: (req, res) => {

    },
}