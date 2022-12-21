const { IndividualContract, StateContract } = require('../../database/models');

module.exports = {
    get: async (req, res) => {
        try {
            const stateList = await StateContract.findAll();
            res.status(200).json({
                data: stateList,
                status: "success",
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: "An error has ocurred when trying to bring the states of individual contracts",
                status: "denied",
            })
        }
    },
    getAllContractsByState: async (req, res) => {
        try {
            const { idState } = req.params;
            const listStates = await IndividualContract.findAll({
                where: { id_state: idState }
            });
            res.status(200).json({
                count: listStates.length,
                data: listStates,
                status: "success",
            });
        } catch (error) {
            res.status(409).json({
                msg: "An error has ocurred trying to bring the states",
                status: "error",
            });
        }
    },
    getStateByContract: async (req, res) => {
        try {
            const { id_state } = req.contract;
            const stateContract = await StateContract.findOne({ where: { id: id_state } });
            if (stateContract) {
                res.status(200).json({
                    msg: "state found",
                    data: stateContract,
                    status: "success",
                });
            } else {
                res.status(404).json({
                    msg: "The contract doesn't have a state",
                    status: "not found",
                });
            }
        } catch (error) {
            res.status(409).json({
                msg: "An error has ocurred trying to bring the state of the contract",
                status: "error",
            });
        }
    },
    create: async (req, res) => {
        try {
            await StateContract.create(req.body);
            res.status(200).json({
                msg: "state created successfully",
                status: "success",
            });
        } catch (error) {
            res.status(409).json({
                msg: "An error has ocurred trying to create the state",
                status: "error",
            });
        }
    },
    edit: (req, res) => {

    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await StateContract.destroy({ where: { id } });
            res.status(200).json({
                msg: "state deleted successfully",
                status: "success",
            });
        } catch (error) {
            res.status(409).json({
                msg: "An error has ocurred trying to delete the state",
                status: "error",
            });
        }
    },
}