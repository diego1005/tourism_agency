const jwt = require('../../helpers/jwt');

module.exports = {
    checkToken: (req, res, next) => {
        const { token } = req.headers['authorization'] || { token: null };
        const auth = jwt.verify(token);
        if (!token || !auth) {
            return res.status(404).json({
                msg: "invalid or expired token",
                status: "denied",
            });
        } else {
            req.user = jwt.decode(token);
            next();
        }
    },
    userIsAdmin: (req, res, next) => {
        const { id_role: admin } = req.body;
        if (admin !== "1") {
            res.status(401).json({
                msg: "Access denied",
                status: "unauthorized"
            })
        } else {
            next();
        }
    }
}