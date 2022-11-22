const { GeneralContract } = require('../../database/models');

module.exports = {
    //Checks if contract exist in the database, for bringing it
    generalContractExist: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { dataValues: contract } = await GeneralContract.findOne({
                where: { id }
            }) || { dataValues: null };
            if (!contract) {
                return res.status(404).json({
                    msg: "Contract doesn't exist",
                    status: "not found",
                });
            } else {
                req.contract = contract;
                next();
            }
        } catch (error) {
            res.status(409).json({
                msg: "An error has ocurred trying to bring the contract",
                error,
                status: "error",
            });
        }
    },
    //generates contract number
    contractNumber: async (req, res, next) => {
        try {
            const lastNumber = await GeneralContract.findAll({
                attributes: ["id"],
                order: [
                    ['nro_contract', 'DESC']
                ],
                limit: 1
            });
            console.log(lastNumber);
        } catch (error) {
            res.status(409).json({
                msg: "An error has ocurred trying to bring last contract number",
                status: "error",
            });
        }
    }
}