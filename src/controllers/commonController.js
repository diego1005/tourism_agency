const { PaymentMethod, Student, User, TravelDestination } = require('../database/models');

module.exports = {
    //Payment
    getPayments: async (req, res) => {
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
    //Stundet
    getStudents: async (req, res) => {
        try {
            const studentList = await Student.findAll({ include: User });
            res.status(200).json({
                data: studentList,
                status: "success",
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: "An error has ocurred when trying to bring the students",
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
    getDestinations: async (req, res) => {
        try {
            const destinationList = await TravelDestination.findAll();
            res.status(200).json({
                data: destinationList,
                status: "success",
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: "An error has ocurred when trying to bring the travel destinations",
                status: "denied",
            })
        }
    },
    destinationCreate: async (req, res) => {
        try {
            await TravelDestination.create(req.body);
            res.status(200).json({
                msg: "destination created successfully",
                status: "success",
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: "An error has ocurred when trying to create the travel destination",
                error,
                returnData: req.body,
                status: "bad request",
            });
        }
    },
    destinationUpgrade: (req, res) => {

    },
    destinationDelete: (req, res) => {

    },
}