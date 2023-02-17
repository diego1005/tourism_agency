const { ContratoGeneral } = require('../../database/models');

module.exports = {
    //Checks if contract exist in the database, for bringing it
    generalContractExist: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { dataValues: contract } = await ContratoGeneral.findOne({
                where: { id }
            }) || { dataValues: null };
            if (!contract) {
                return res.status(404).json({
                    msg: "El contrato general no existe",
                    status: "not found",
                });
            } else {
                req.contract = contract;
                next();
            }
        } catch (error) {
            res.status(409).json({
                msg: "Ha ocurrido un error al intentar traer el contrato general",
                error,
                status: "error",
            });
        }
    },
    //generates contract number
    contractNumber: async (req, res, next) => {
        try {
            const lastNumber = await ContratoGeneral.findAll({
                attributes: ["id"],
                order: [
                    ['cod_contrato', 'DESC']
                ],
                limit: 1
            });
            console.log(lastNumber);
        } catch (error) {
            res.status(409).json({
                msg: "Ha ocurrido un error al intentar traer el ultimo codigo de contrato general",
                status: "error",
            });
        }
    }
}