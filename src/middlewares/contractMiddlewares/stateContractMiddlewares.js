const {
    IndividualContract,
    GeneralContract,
    StateIndividualContract,
    StateGeneralContract
} = require('../../database/models');

module.exports = {
    stateIndividualExist: async (req, res, next) => {
        try {
            const { idState } = req.params;
            const state = await StateIndividualContract.findByPk(idState);
            if (state) {
                next()
            } else {
                res.status(404).json({
                    msg: "State doesn't exist",
                    status: "not found",
                });
            }
        } catch (error) {
            res.status(409).json({
                msg: "An error has ocurred trying to find the state",
                status: "error",
            });
        }
    },
    stateGeneralExist: async (req, res, next) => {
        try {
            const { idState } = req.params;
            const state = await StateGeneralContract.findByPk(idState);
            if (state) {
                next()
            } else {
                res.status(404).json({
                    msg: "State doesn't exist",
                    status: "not found",
                });
            }
        } catch (error) {
            res.status(409).json({
                msg: "An error has ocurred trying to find the state",
                status: "error",
            });
        }
    }
}