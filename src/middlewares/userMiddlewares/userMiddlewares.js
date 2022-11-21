const { User } = require('../../database/models');
const { Op } = require("sequelize");
const { USER_ADMIN_ROLE, USER_STUDENT_ROLE, USER_RESP_ROLE } = require('../../constants/roles');

module.exports = {
    //Checks if user exist in the database, for bringing it
    userExist: async (req, res, next) => {
        try {
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
        } catch (error) {
            res.status(409).json({
                msg: "An error has ocurred on userExist",
                status: "error",
            });
        }
    },
    //Check if email doesn't exist already, for add a new one
    userAlreadyExist: async (req, res, next) => {
        try {
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
        } catch (error) {
            res.status(409).json({
                msg: "An error has ocurred on userAlreadyExist",
                status: "error",
            });
        }
    },
    roleUser: (req, res, next) => {
        const { id_role } = req.body;
        if (id_role !== USER_ADMIN_ROLE) {
            req.student = req.body;
            next();
        } else {
            req.admin = req.body;
            next();
        }
    }
}