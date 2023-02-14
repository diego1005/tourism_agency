const { Role, User } = require('../../database/models');
const { Op } = require('sequelize');
const { USER_SUPER, USER_EDITOR, USER_STUDENT } = require('../../constants/roles');

module.exports = {
  //Checks if user exist in the database, for bringing it
  userExist: async (req, res, next) => {
    try {
      const param = req.params.id || req.body.username;
      const { dataValues: user } = (await User.findOne({
        where: {
          [Op.or]: [{ id: param }, { email: param }]
        },
        include: [
          {
            model: Role,
            as: 'role'
          }
        ]
      })) || { dataValues: null };
      if (!user) {
        return res.status(404).json({
          status: 'not found',
          msg: "User doesn't exist"
        });
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(409).json({
        status: 'error',
        msg: 'An error has ocurred on userExist'
      });
    }
  },
  //Check if email doesn't exist already, for add a new one
  userAlreadyExist: async (req, res, next) => {
    try {
      const { email } = req.body;
      const { dataValues: user } = (await User.findOne({ where: { email } })) || { dataValues: null };
      if (!user) {
        next();
      } else {
        //TODO: delete avatar img uploaded ?
        res.status(409).json({
          staus: 'denied',
          msg: 'invalid or existing username',
          returnData: req.body
        });
      }
    } catch (error) {
      res.status(409).json({
        status: 'error',
        msg: 'An error has ocurred on userAlreadyExist'
      });
    }
  },
  roleUser: (req, res, next) => {
    const { id_role } = req.body;
    delete req.body.confirmPassword;
    if (id_role != USER_ADMIN_ROLE) {
      req.student = req.body;
      next();
    } else {
      req.admin = req.body;
      next();
    }
  }
};
