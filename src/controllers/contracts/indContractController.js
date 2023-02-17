const { validationResult } = require('express-validator');
const { ContratoIndividual } = require('../../database/models');

module.exports = {
  get: async (req, res) => {
    try {
      const individualContractsList = await ContratoIndividual.findAll();
      if (individualContractsList) {
        res.status(200).json({
          count: individualContractsList.length,
          data: individualContractsList,
          status: 'success'
        });
      } else {
        res.status(404).json({
          msg: 'Aun no hay contratos cargados',
          status: 'not found'
        });
      }
    } catch (error) {
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar traer los contratos',
        error,
        status: 'error'
      });
    }
  },
  getByDni: (req, res) => {
    res.status(200).json({
      msg: 'Contrato encontrado',
      data: req.contract,
      status: 'success'
    });
  },
  create: async (req, res) => {
    //form fields validations
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      //validations without errors
      //new individual contract
      try {
      } catch (error) {}
    } else {
      //validations with errors
      res.status(400).json({
        msg: 'El formulario tiene errores en los campos',
        error: errors,
        returnData: req.body,
        status: 'bad request'
      });
    }
  },
  edit: async (req, res) => {},
  delete: async (req, res) => {}
};
