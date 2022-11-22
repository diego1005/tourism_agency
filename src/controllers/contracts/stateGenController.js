const { GeneralContract, StateGeneralContract } = require('../../database/models');

module.exports = {
    getAllContractsByState: async (req, res) => {
        try {
            const { idState } = req.params;
            const listStates = await GeneralContract.findAll({
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
            const stateContract = await StateGeneralContract.findOne({ where: { id: id_state } });
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
            await StateGeneralContract.create(req.body);
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
            await StateGeneralContract.destroy({ where: { id } });
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