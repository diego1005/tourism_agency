const { Role } = require('../database/models');

module.exports = {
  get: async (req, res) => {
    try {
      const roles = await Role.findAll();
      res.status(200).json({
        status: 'success',
        count: roles.length,
        data: roles
      });
    } catch (error) {
      res.status(409).json({
        msg: 'An error has ocurred trying to bring the users',
        error,
        status: 'error'
      });
    }
  },
  create: async (req, res) => {
    try {
      const { name, description } = req.body;
      const { dataValues: newRole } = await Role.create({
        name,
        description
      });
      res.status(200).json({
        msg: 'role created successfully',
        data: newRole,
        status: 'success'
      });
    } catch (error) {
      res.status(409).json({
        msg: 'An error has ocurred trying to create the role',
        error,
        status: 'error'
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Role.destroy({ where: { id } });
      res.status(200).json({
        msg: 'role deleted successfully',
        status: 'success'
      });
    } catch (error) {
      res.status(409).json({
        msg: 'An error has ocurred trying to delete the role',
        error,
        status: 'error'
      });
    }
  }
};
