const { PaymentMethod } = require('../database/models');

module.exports = {
    //Payment
    paymentGet: async (req, res) => {
        try {
            const paymentsList = await PaymentMethod.findAll();
            res.status(200).json({
                data: paymentsList,
                status: "success",
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: "An error has ocurred when trying to bring payment methods",
                status: "denied",
            })
        }
    },
    paymentCreate: (req, res) => {

    },
    paymentUpgrade: (req, res) => {

    },
    paymentDelete: (req, res) => {

    },
    //Responsible
    responsibleCreate: (req, res) => {

    },
    responsibleUpgrade: (req, res) => {

    },
    responsibleDelete: (req, res) => {

    },
    //Destination
    destinationCreate: (req, res) => {

    },
    destinationUpgrade: (req, res) => {

    },
    destinationDelete: (req, res) => {

    },
}