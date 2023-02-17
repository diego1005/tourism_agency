const { Rol, Usuario } = require('../../database/models');
const { Op } = require('sequelize');
const { USER_SUPER, USER_EDITOR, USER_STUDENT } = require('../../constants/roles');

module.exports = {
  //Checks if user exist in the database, for bringing it
  userExist: async (req, res, next) => {
    try {
      const param = req.params.id || req.body.email;
      const { dataValues: user } = (await Usuario.findOne({
        where: {
          [Op.or]: [{ id: param }, { email: param }]
        },
        include: [
          {
            model: Rol,
            as: 'rol'
          }
        ]
      })) || { dataValues: null };
      if (!user) {
        return res.status(404).json({
          status: 'not found',
          msg: "El usuario no existe"
        });
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(409).json({
        status: 'error',
        msg: 'Ha ocurrido un error al intentar verificar el usuario'
      });
    }
  },
  //Check if email doesn't exist already, for add a new one
  userAlreadyExist: async (req, res, next) => {
    try {
      const { email } = req.body;
      const { dataValues: user } = (await Usuario.findOne({ where: { email } })) || { dataValues: null };
      if (!user) {
        next();
      } else {
        //TODO: delete avatar img uploaded ?
        res.status(409).json({
          staus: 'denied',
          msg: 'El usuario ya existe o es invalido',
          returnData: req.body
        });
      }
    } catch (error) {
      res.status(409).json({
        status: 'error',
        msg: 'Ha ocurido un error al intentar verificar el usuario'
      });
    }
  },
  roleUser: (req, res, next) => {
    const { id_rol } = req.body;
    delete req.body.confirmPassword;
    if (id_rol != USER_ADMIN_ROLE) {
      req.student = req.body;
      next();
    } else {
      req.admin = req.body;
      next();
    }
  }
};
