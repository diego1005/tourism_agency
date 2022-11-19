const jwt = require('../../helpers/jwt');

module.exports = {
    checkToken: (req, res, next) => {
        const { token } = req.headers['authorization'];
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

    }
}