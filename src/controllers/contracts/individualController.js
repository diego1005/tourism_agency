const { ContratoIndividual, ContratoGeneral, Institucion, Pasajero } = require('../../database/models');
const { validationResult } = require('express-validator');

module.exports = {
  get: async (req, res) => {
    try {
      const individualContracts = await ContratoIndividual.findAll({
        include: [
          {
            model: ContratoGeneral,
            as: 'contrato_general',
            include: {
              model: Institucion,
              as: 'institucion'
            }
          },
          {
            model: Pasajero,
            as: 'pasajero'
          }
        ],
        order: [['id', 'DESC']]
      });
      res.status(200).json({
        status: 'success',
        count: individualContracts.length,
        data: individualContracts
      });
    } catch (error) {
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar recuperar los contratos individuales',
        error,
        status: 'error'
      });
    }
  },
  getById: (req, res) => {
    res.status(200).json({
      status: 'success',
      msg: 'Contrato individual encontrado',
      data: req.individualContract
    });
  },
  create: async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const estado = 'Pendiente';
        const pagos = 0;
        const individualContract = req.body;
        const cod_contrato = 'XXXXXXXXXXXXXXXX';
        /* const fede =  */ await ContratoIndividual.create({ ...individualContract, cod_contrato, pagos, estado });
        const { dataValues: contractGen } = await ContratoGeneral.findByPk(req.body.id_contrato_general, { attributes: ['cod_contrato'] });
        const { dataValues: pasajero } = await Pasajero.findByPk(req.body.id_pasajero, { attributes: ['documento'] });
        const contrato = contractGen.cod_contrato;
        const documento = pasajero.documento;
        await ContratoIndividual.update({ cod_contrato: `${contrato}/${documento}` }, { where: { cod_contrato } });
        res.status(200).json({
          status: 'success',
          msg: 'Contrato individual creado con éxito',
          cod_contrato_general: contrato,
          cod_contrato_individual: `${contrato}/${documento}`
        });
      } catch (error) {
        res.status(409).json({
          status: 'error',
          msg: 'Ha ocurrido un error al intentar crear el contrato individual',
          error
        });
      }
    } else {
      res.status(400).json({
        status: 'bad request',
        msg: 'El formulario tiene errores en los campos',
        error: errors,
        returnData: req.body
      });
    }
  },
  edit: async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const individualContract = req.body;
        const { pagos, estado, ...rest } = individualContract;
        const { id } = req.params;
        await ContratoIndividual.update({ ...rest }, { where: { id } });
        res.status(200).json({
          status: 'success',
          msg: 'Contrato individual editado con éxito'
        });
      } catch (error) {
        res.status(409).json({
          status: 'error',
          msg: 'Ha ocurrido un error al intentar editar el contrato individual',
          error
        });
      }
    } else {
      res.status(400).json({
        status: 'bad request',
        msg: 'El formulario tiene errores en los campos',
        error: errors,
        returnData: req.body
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await ContratoIndividual.destroy({ where: { id } });
      res.status(200).json({
        status: 'success',
        msg: 'Contrato general borrado con éxito'
      });
    } catch (error) {
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar borrar el contrato general',
        error,
        status: 'error'
      });
    }
  }
};
