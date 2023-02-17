const { Pasajero, Responsable } = require('../database/models');
const { validationResult } = require('express-validator');

module.exports = {
  get: async (req, res) => {
    try {
      const passengers = await Pasajero.findAll({
        include: [
          {
            model: Responsable,
            as: 'responsable'
          }
        ]
      });
      res.status(200).json({
        status: 'success',
        count: passengers.length,
        data: passengers
      });
    } catch (error) {
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar traer los pasajeros',
        error,
        status: 'error'
      });
    }
  },
  getById: (req, res) => {
    res.status(200).json({
      status: 'success',
      msg: 'Pasajero encontrado',
      data: req.passenger
    });
  },
  create: async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const passenger = req.body;
        await Pasajero.create(passenger);
        res.status(200).json({
          status: 'success',
          msg: 'Pasajero creado con éxito'
        });
      } catch (error) {
        res.status(409).json({
          status: 'error',
          msg: 'Ha ocurrido un error al intentar crear el pasajero',
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
        const passenger = req.body;
        const { id } = req.params;
        await Pasajero.update({ ...passenger }, { where: { id } });
        res.status(200).json({
          status: 'success',
          msg: 'Pasajero editado con éxito'
        });
      } catch (error) {
        res.status(409).json({
          status: 'error',
          msg: 'Ha ocurrido un error al intentar editar el pasajero',
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
      await Pasajero.destroy({ where: { id } });
      res.status(200).json({
        status: 'success',
        msg: 'Pasajero borrado con éxito'
      });
    } catch (error) {
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar borrar el pasajero',
        error,
        status: 'error'
      });
    }
  }
};