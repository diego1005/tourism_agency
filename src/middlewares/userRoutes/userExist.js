const { User } = require("../../database/models");

const userExist = async (req, res, next) => {
    const { id } = req.params;
    const { dataValues: user } = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: "user doesn't exist",
            status: "denied",
        });
    } else {
        req.user = user;
        next();
    }
};

module.exports = userExist;
