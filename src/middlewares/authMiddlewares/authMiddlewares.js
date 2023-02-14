const { USER_ADMIN_ROLE } = require('../../constants/roles');
const jwt = require('../../helpers/jwt');

module.exports = {
  checkToken: (req, res, next) => {
    const token = req.headers['authorization'].split('Bearer ')[1] || { token: null };
    const auth = jwt.verify(token);
    if (!token || !auth) {
      return res.status(404).json({
        msg: 'invalid or expired token',
        status: 'denied'
      });
    } else {
      req.user = jwt.decode(token);
      req.token = token;
      next();
    }
  },
  userIsAdmin: (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({
        msg: 'Access denied. You need to send a valid token',
        status: 'unauthorized'
      });
    }
    console.log(token);
    const decoded = jwt.decode(token.split('Bearer ')[1]);
    if (decoded.role.name !== 'super') {
      res.status(401).json({
        msg: 'Access denied',
        status: 'unauthorized'
      });
    } else {
      next();
    }
  }
};
