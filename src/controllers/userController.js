const { validationResult } = require('express-validator');
const { User, Role } = require('../database/models');
const bcrypt = require('../helpers/bcrypt');

module.exports = {
  get: async (req, res) => {
    try {
      const listUsers = await User.findAll({
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Role,
            as: 'role'
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
        msg: 'An error has ocurred trying to bring the users',
        error,
        status: 'error'
      });
    }
  },
  getById: (req, res) => {
    res.status(200).json({
      msg: 'user found',
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
        const newUser = await User.create({
          ...user,
          password: hashPassword,
          id_role: 2 // ROL EDITOR
        });
        res.status(200).json({
          msg: 'user created successfully',
          status: 'success'
        });
      } catch (error) {
        //TODO: delete avatar img uploaded
        res.status(409).json({
          msg: 'An error has ocurred trying to create the user',
          error,
          status: 'error'
        });
      }
    } else {
      //validations with errors
      //TODO: delete avatar img uploaded
      res.status(400).json({
        msg: 'the form has input errors',
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
        const { id } = req.params;
        const updatedUser = await User.update({ ...user }, { where: { id } });
        res.status(200).json({
          msg: 'user updated successfully',
          data: updatedUser,
          status: 'success'
        });
      } catch (error) {
        console.log(error);
        //TODO: delete avatar img uploaded
        res.status(409).json({
          msg: 'An error has ocurred trying to edit the user',
          error,
          status: 'error'
        });
      }
    } else {
      //validations with errors
      //TODO: delete avatar img uploaded
      res.status(400).json({
        msg: 'the form has input errors',
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
        await User.update(
          {
            password: await bcrypt.hash(password)
          },
          {
            where: { id }
          }
        );
        res.status(200).json({
          status: 'success',
          msg: 'Passwod changed successfully'
        });
      } catch (error) {
        console.log(error);
        res.status(409).json({
          status: 'error',
          msg: "An error has ocurred trying to change the user's password",
          error
        });
      }
    } else {
      res.status(400).json({
        status: 'bad request',
        msg: 'the form has input errors',
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
      const deletedUser = await User.destroy({ where: { id } });
      res.status(200).json({
        msg: 'user deleted successfully',
        status: 'success'
      });
    } catch (error) {
      res.status(409).json({
        msg: 'An error has ocurred trying to delete the user',
        error,
        status: 'error'
      });
    }
  }
};
