const { ContratoGeneral, Institucion } = require('../../database/models');
const { validationResult } = require('express-validator');

module.exports = {
  get: async (req, res) => {
    try {
      const generalContracts = await ContratoGeneral.findAll({
        include: [
          {
            model: Institucion,
            as: 'institucion'
          }
        ]
      });
      res.status(200).json({
        status: 'success',
        count: generalContracts.length,
        data: generalContracts
      });
    } catch (error) {
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar recuperar los contratos generales',
        error,
        status: 'error'
      });
    }
  },
  getById: (req, res) => {
    res.status(200).json({
      status: 'success',
      msg: 'Contrato general encontrado',
      data: req.generalContract
    });
  },
  create: async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        console.log('2');
        const generalContract = req.body;
        const { cod_contrato } = req;
        const now = new Date();
        const estado = 'Pendiente';
        await ContratoGeneral.create({ ...generalContract, fecha_contrato: now, cod_contrato, estado });
        res.status(200).json({
          status: 'success',
          msg: 'Contrato general creado con éxito',
          cod_contrato
        });
      } catch (error) {
        res.status(409).json({
          status: 'error',
          msg: 'Ha ocurrido un error al intentar crear el contrato general',
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
        const generalContract = req.body;
        const { fecha_contrato, cod_contrato, estado, ...rest } = generalContract;
        const { id } = req.params;
        await ContratoGeneral.update({ ...rest }, { where: { id } });
        res.status(200).json({
          status: 'success',
          msg: 'Contrato general editado con éxito'
        });
      } catch (error) {
        res.status(409).json({
          status: 'error',
          msg: 'Ha ocurrido un error al intentar editar el contrato general',
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
      await ContratoGeneral.destroy({ where: { id } });
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
