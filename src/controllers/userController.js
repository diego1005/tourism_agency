const { validationResult } = require('express-validator');
const { Usuario, Rol } = require('../database/models');
const bcrypt = require('../helpers/bcrypt');

module.exports = {
  get: async (req, res) => {
    try {
      const listUsers = await Usuario.findAll({
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Rol,
            as: 'rol'
          }
        ]
      });
      res.status(200).json({
        count: listUsers.length,
        data: listUsers,
        status: 'success'
      });
    } catch (error) {
      //TODO: Create a helper endpoint error respons
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar traer los usuarios',
        error,
        status: 'error'
      });
    }
  },
  getById: (req, res) => {
    res.status(200).json({
      msg: 'Usuario encontrado',
      data: req.user,
      token: req.token,
      status: 'success'
    });
  },
  create: async (req, res) => {
    //form fields validations
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      //validations without errors
      //new user
      try {
        const user = req.body;
        const { password } = user;
        const hashPassword = await bcrypt.hash(password);
        const newUser = await Usuario.create({
          ...user,
          password: hashPassword
        });
        res.status(200).json({
          msg: 'Usuario creado con exito',
          status: 'success'
        });
      } catch (error) {
        //TODO: delete avatar img uploaded
        res.status(409).json({
          msg: 'Ha ocurrido un error al intentar crear el usuario',
          error,
          status: 'error'
        });
      }
    } else {
      //validations with errors
      //TODO: delete avatar img uploaded
      res.status(400).json({
        msg: 'El formulario tiene errores en los campos',
        error: errors,
        returnData: req.body,
        status: 'bad request'
      });
    }
  },
  edit: async (req, res) => {
    //form fields validations
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      //validations without errors
      try {
        const user = req.body;
        console.log(req.body);
        const { id } = req.params;
        const hasshedPassword = await bcrypt.hash(req.body.password);
        const updatedUser = await Usuario.update({ ...user, password: hasshedPassword }, { where: { id } });
        res.status(200).json({
          msg: 'Usuario editado con exito',
          data: updatedUser,
          status: 'success'
        });
      } catch (error) {
        console.log(error);
        //TODO: delete avatar img uploaded
        res.status(409).json({
          msg: 'Ha ocurrido un error al intentar editar el usuario',
          error,
          status: 'error'
        });
      }
    } else {
      //validations with errors
      //TODO: delete avatar img uploaded
      res.status(400).json({
        msg: 'El formulario tiene errores en los campos',
        error: errors,
        returnData: req.body,
        status: 'bad request'
      });
    }
  },
  editPass: async (req, res) => {
    //form fields validations
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      //validations without errors
      try {
        const { id } = req.params;
        const { password } = req.body;
        await Usuario.update(
          {
            password: await bcrypt.hash(password)
          },
          {
            where: { id }
          }
        );
        res.status(200).json({
          status: 'success',
          msg: 'La contraseña se cambio con exito'
        });
      } catch (error) {
        console.log(error);
        res.status(409).json({
          status: 'error',
          msg: "Ha ocurrido un error al intentar cambiar la contraseña",
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
  //TODO: FOR IMPLEMENT EVENTLY
  /*
    editImg: (req, res) => {
        res.send("change user avatar");
    },
    */
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await Usuario.destroy({ where: { id } });
      res.status(200).json({
        msg: 'Usuario borrado con exito',
        status: 'success'
      });
    } catch (error) {
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar borrar el usuario',
        error,
        status: 'error'
      });
    }
  }
};
