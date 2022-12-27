const { GeneralContract } = require('../../database/models');

module.exports = {
    get: async (req, res) => {
        try {
            const generalList = await GeneralContract.findAll();
            res.status(200).json({
                data: generalList,
                status: "success",
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: "An error has ocurred when trying to bring General Contracts",
                status: "denied",
            })
        }
    },
    getById: (req, res) => {

    },
    create: (req, res) => {

    },
    edit: (req, res) => {

    },
    delete: (req, res) => {

    },
}