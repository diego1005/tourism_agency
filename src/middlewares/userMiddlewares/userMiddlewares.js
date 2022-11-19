const { User } = require('../../database/models');

module.exports = {
    //Checks if user exist in the database, for bringing it
    userExist: async (req, res, next) => {
        const { id } = req.params;
        const { dataValues: user } = await User.findByPk(id) || { dataValues: null };
        if (!user) {
            return res.status(404).json({
                msg: "user doesn't exist",
                status: "denied",
            });
        } else {
            req.user = user;
            next();
        }
    },
    //Check if email doesn't exist already
    userAlreadyExist: async (req, res, next) => {
        const { email } = req.body;
        const { dataValues: user } = await User.findOne({ where: { email } }) || { dataValues: null };
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
}