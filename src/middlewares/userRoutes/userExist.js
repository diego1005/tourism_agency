const { User } = require('../../database/models');

const userExist = (req, res, next) => {
    const { id } = req.params;
    const user = User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: "user doesn't exist",
            status: "denied"
        })
    } else {
        next();
    }
}

module.exports = userExist;