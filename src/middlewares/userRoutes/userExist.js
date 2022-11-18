const { User } = require('../../database/models');

const userExist = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({
        attributes: ["id", "name", "lastname", "email", "id_role"],
        where: { id }
    });
    if (!user) {
        return res.status(404).json({
            msg: "user doesn't exist",
            status: "denied"
        })
    } else {
        req.user = user;
        next();
    }
}

module.exports = userExist;