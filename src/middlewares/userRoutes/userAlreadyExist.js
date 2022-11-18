const { User } = require('../../database/models');

const userAlreadyExist = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        next();
    } else {
        //TODO: delete avatar img uploaded ?
        res.status(409).json({
            msg: "invalid or existing username",
            returnData: req.body,
            status: "denied"
        })
    }
}

module.exports = userAlreadyExist;