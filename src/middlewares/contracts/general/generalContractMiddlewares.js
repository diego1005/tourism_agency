const { ContratoGeneral, ContratoIndividual, Institucion } = require('../../../database/models');
const randomCode = require('../../../helpers/randomCode');

module.exports = {
  generalContractExist: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { dataValues: generalContract } = (await ContratoGeneral.findOne({
        where: { id },
        include: [
          {
            model: Institucion,
            as: 'institucion'
          }
        ]
      })) || { dataValues: null };
      if (!generalContract) {
        return res.status(404).json({
          status: 'not found',
          msg: 'El contrato general no existe'
        });
      } else {
        const individualContracts = await ContratoIndividual.findAll({
          where: { id_contrato_general: generalContract.id }
        });
        req.generalContract = { ...generalContract, contratos_individuales: [...individualContracts] };
        next();
      }
    } catch (error) {
      res.status(409).json({
        status: 'error',
        msg: 'Ha ocurrido un error al intentar verificar el contrato general'
      });
    }
  },
  generalContractAlreadyExist: async (req, res, next) => {
    try {
      // const { cod_contrato } = req.body;
      console.log('1');
      const cod_contrato = randomCode();
      console.log(cod_contrato);
      const { dataValues: generalContract } = (await ContratoGeneral.findOne({ where: { cod_contrato } })) || { dataValues: null };
      if (!generalContract) {
        req.cod_contrato = cod_contrato;
        next();
      } else {
        res.status(409).json({
          staus: 'denied',
          msg: 'El contrato general ya existe o es inválido',
          returnData: req.body
        });
      }
    } catch (error) {
      res.status(409).json({
        status: 'error',
        msg: 'Ha ocurido un error al intentar verificar el contrato general'
      });
    }
  }
};
