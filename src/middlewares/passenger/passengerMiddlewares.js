const { Pasajero, Responsable } = require('../../database/models');

module.exports = {
  passengerExist: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { dataValues: passenger } = (await Pasajero.findOne({
        where: { id },
        include: [
          {
            model: Responsable,
            as: 'responsable'
          }
        ]
      })) || { dataValues: null };
      if (!passenger) {
        return res.status(404).json({
          status: 'not found',
          msg: 'El pasajero no existe'
        });
      } else {
        req.passenger = passenger;
        next();
      }
    } catch (error) {
      res.status(409).json({
        status: 'error',
        msg: 'Ha ocurrido un error al intentar verificar el pasajero'
      });
    }
  },
  passengerAlreadyExist: async (req, res, next) => {
    try {
      const { documento } = req.body;
      const { dataValues: passenger } = (await Pasajero.findOne({ where: { documento } })) || { dataValues: null };
      if (!passenger) {
        next();
      } else {
        res.status(409).json({
          staus: 'denied',
          msg: 'El pasajero ya existe o es inválido',
          returnData: req.body
        });
      }
    } catch (error) {
      res.status(409).json({
        status: 'error',
        msg: 'Ha ocurido un error al intentar verificar el pasajero'
      });
    }
  }
};
