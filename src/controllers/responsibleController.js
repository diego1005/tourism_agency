const { Responsable } = require('../database/models');
const { validationResult } = require('express-validator');

module.exports = {
  get: async (req, res) => {
    try {
      const responsibles = await Responsable.findAll({
        /* include: [
          {
            model: Pasajero,
            as: 'pasajeros'
          }
        ] */
      });
      res.status(200).json({
        status: 'success',
        count: responsibles.length,
        data: responsibles
      });
    } catch (error) {
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar traer los usuarios',
        error,
        status: 'error'
      });
    }
  },
  getById: (req, res) => {
    res.status(200).json({
      status: 'success',
      msg: 'Responsable encontrado',
      data: req.responsible
    });
  },
  create: async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const responsible = req.body;
        console.log(responsible);
        await Responsable.create(responsible);
        res.status(200).json({
          status: 'success',
          msg: 'Responsable creado con éxito'
        });
      } catch (error) {
        res.status(409).json({
          status: 'error',
          msg: 'Ha ocurrido un error al intentar crear el responsable',
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
        const responsible = req.body;
        const { id } = req.params;
        await Responsable.update({ ...responsible }, { where: { id } });
        res.status(200).json({
          status: 'success',
          msg: 'Responsable editado con éxito'
        });
      } catch (error) {
        res.status(409).json({
          status: 'error',
          msg: 'Ha ocurrido un error al intentar editar el responsable',
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
      await Responsable.destroy({ where: { id } });
      res.status(200).json({
        status: 'success',
        msg: 'Responsable borrado con exito'
      });
    } catch (error) {
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar borrar el responsable',
        error,
        status: 'error'
      });
    }
  }
};
