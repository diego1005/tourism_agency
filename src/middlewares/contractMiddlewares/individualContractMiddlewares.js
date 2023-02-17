const { ContratoIndividual } = require('../../database/models');
const { Op } = require('sequelize');

module.exports = {
    //Checks if contract exist in the database, for bringing it
    individualContractExist: async (req, res, next) => {
        try {
            const { param } = req.params.id || req.params.documento;
            const { dataValues: contract } = await ContratoIndividual.findOne({
                where: {
                    [Op.or]: [
                        { id: param },
                        { documento: param },
                    ]
                }
            }) || { dataValues: null };
            if (!contract) {
                res.status(404).json({
                    msg: "El contrato individual no existe",
                    status: "not found",
                });
            } else {
                req.contract = contract;
                next();
            }
        } catch (error) {
            res.status(409).json({
                msg: "Ha ocurrido un error al intentar traer el contrato individual",
                error,
                status: "error",
            });
        }
    },
    //generates contract number
    contractNumber: async (req, res, next) => {
        try {
            const lastNumber = await ContratoIndividual.findAll({
                attributes: ["id"],
                order: [
                    ['cod_contrato', 'DESC']
                ],
                limit: 1
            });
            console.log(lastNumber);
        } catch (error) {
            res.status(409).json({
                msg: "Ha ocurrido un error al intentar traer el ultimo codigo de contrato individual",
                status: "error",
            });
        }
    }
}