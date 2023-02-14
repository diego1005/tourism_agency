const { validationResult } = require('express-validator');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');

module.exports = {
  login: async (req, res) => {
    //form fields validations
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      //validations without errors
      try {
        const { password: storedPassword } = req.user;
        const { password } = req.body;
        const auth = await bcrypt.compare(password, storedPassword);
        if (!auth) {
          res.status(401).json({
            status: 'Unauthorized',
            msg: "Password doesn't match"
          });
        } else {
          //creates security token
          const { user } = req;
          const { password, id_role, ...rest } = user;
          console.log(rest);
          const token = jwt.sign(rest);
          res.status(200).json({
            status: 'success',
            msq: 'user logged in successfully',
            user: rest,
            token
          });
        }
      } catch (error) {
        res.status(409).json({
          status: 'error',
          msg: 'An error has ocurred trying to log in',
          error
        });
      }
    } else {
      //validations with errors
      res.status(400).json({
        msg: 'the form has input errors',
        error: errors,
        returnData: req.body,
        status: 'bad request'
      });
    }
  },
  checkToken: (req, res) => {
    const { firstname, lastname, email, id_role } = req.user;
    const { token } = req;
    res.status(200).json({
      msg: 'token is valid',
      user: { firstname, lastname, email, id_role },
      token: token,
      status: 'success'
    });
  }
};
