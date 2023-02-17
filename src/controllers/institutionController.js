const { Institucion } = require('../database/models');
const { validationResult } = require('express-validator');

module.exports = {
  get: async (req, res) => {
    try {
      const institutions = await Institucion.findAll({
        /* include: [
          {
            model: Responsable,
            as: 'responsable'
          }
        ] */
      });
      res.status(200).json({
        status: 'success',
        count: institutions.length,
        data: institutions
      });
    } catch (error) {
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar recuperar las instituciones',
        error,
        status: 'error'
      });
    }
  },
  getById: (req, res) => {
    res.status(200).json({
      status: 'success',
      msg: 'Institución encontrada',
      data: req.institution
    });
  },
  create: async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const institution = req.body;
        await Institucion.create(institution);
        res.status(200).json({
          status: 'success',
          msg: 'Institucion creada con éxito'
        });
      } catch (error) {
        res.status(409).json({
          status: 'error',
          msg: 'Ha ocurrido un error al intentar crear la institución',
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
        const institution = req.body;
        const { id } = req.params;
        await Institucion.update({ ...institution }, { where: { id } });
        res.status(200).json({
          status: 'success',
          msg: 'Institución editada con éxito'
        });
      } catch (error) {
        res.status(409).json({
          status: 'error',
          msg: 'Ha ocurrido un error al intentar editar la institución',
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
      await Institucion.destroy({ where: { id } });
      res.status(200).json({
        status: 'success',
        msg: 'Institución borrada con éxito'
      });
    } catch (error) {
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar borrar la institución',
        error,
        status: 'error'
      });
    }
  }
};
