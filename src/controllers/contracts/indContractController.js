const { validationResult } = require("express-validator");
const { Contract, IndividualContract, StateContract } = require('../../database/models');

module.exports = {
    get: async (req, res) => {
        try {
            const listOfContracts = await IndividualContract.findAll(
                {
                    include: [
                        { model: Contract, as: "contract" },
                        { model: StateContract, as: "state_individual_contracts" }
                    ]
                }
            );
            if (listOfContracts) {
                res.status(200).json({
                    count: listOfContracts.length,
                    data: listOfContracts,
                    status: "success",
                });
            } else {
                res.status(404).json({
                    msg: "There are no contracts yet",
                    status: "not found",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(409).json({
                msg: "An error has ocurred trying to bring the contracts",
                error,
                status: "error",
            });
        }
    },
    getByDni: (req, res) => {
        res.status(200).json({
            msg: "contract found",
            data: req.contract,
            status: "success",
        });
    },
    create: async (req, res) => {
        //form fields validations
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //validations without errors
            //new individual contract
            try {

            } catch (error) {

            }
        } else {
            //validations with errors
            res.status(400).json({
                msg: "the form has input errors",
                error: errors,
                returnData: req.body,
                status: "bad request",
            });
        }
    },
    edit: async (req, res) => {

    },
    delete: async (req, res) => {

    },
}