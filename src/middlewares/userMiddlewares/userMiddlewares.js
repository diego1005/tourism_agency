const { User } = require('../../database/models');
const { Op } = require("sequelize");

module.exports = {
    //Checks if user exist in the database, for bringing it
    userExist: async (req, res, next) => {
        const param = req.params.id || req.body.username;
        const { dataValues: user } = await User.findOne({
            where: {
                [Op.or]: [
                    { id: param },
                    { email: param }
                ]
            }
        }) || { dataValues: null };
        if (!user) {
            return res.status(404).json({
                msg: "User doesn't exist",
                status: "not found",
            });
        } else {
            req.user = user;
            next();
        }
    },
    //Check if email doesn't exist already, for add a new one
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