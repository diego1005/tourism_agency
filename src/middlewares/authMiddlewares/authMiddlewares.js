const { USER_ADMIN_ROLE } = require('../../constants/roles');
const jwt = require('../../helpers/jwt');

module.exports = {
    checkToken: (req, res, next) => {
        const token = req.headers['authorization'] || { token: null };
        const auth = jwt.verify(token);
        if (!token || !auth) {
            return res.status(404).json({
                msg: "invalid or expired token",
                status: "denied",
            });
        } else {
            req.user = jwt.decode(token);
            req.token = token;
            next();
        }
    },
    userIsAdmin: (req, res, next) => {
        const admin = req.headers["role"];
        if (admin !== USER_ADMIN_ROLE) {
            res.status(401).json({
                msg: "Access denied",
                status: "unauthorized"
            })
        } else {
            next();
        }
    }
}