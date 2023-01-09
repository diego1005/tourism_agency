const { validationResult } = require("express-validator");
const { User, Student } = require("../database/models");
const bcrypt = require("../helpers/bcrypt");
const jwt = require("../helpers/jwt");

module.exports = {
    get: async (req, res) => {
        try {
            const listUsers = await User.findAll({
                attributes: ["name", "lastname", "email"],
            });
            res.status(200).json({
                count: listUsers.length,
                data: listUsers,
                status: "success",
            });
        } catch (error) {
            //TODO: Create a helper endpoint error respons
            res.status(409).json({
                msg: "An error has ocurred trying to bring the users",
                error,
                status: "error",
            });
        }
    },
    getById: (req, res) => {
        res.status(200).json({
            msg: "user found",
            data: req.user,
            token: req.token,
            status: "success",
        });
    },
    create: async (req, res) => {
        //form fields validations
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //validations without errors
            //new user
            try {
                const user = req.student || req.admin;
                const { password } = user;
                const hashPassword = await bcrypt.hash(password);
                delete user.password;
                let newUser = {};
                if (req.student) {
                    const { dataValues: userCreated } = await User.create({
                        ...user,
                        password: hashPassword,
                    });
                    const { dataValues: studentCreated } = await Student.create({
                        ...user,
                        id_user: userCreated.id,
                    })
                    newUser = {
                        userCreated,
                        studentCreated,
                    }
                }
                if (req.admin) {
                    newUser = await User.create({
                        ...user,
                        password: hashPassword,
                    });
                }
                //delete password from newUser data
                delete newUser.password;
                res.status(200).json({
                    msg: "user created successfully",
                    status: "success",
                });
            } catch (error) {
                //TODO: delete avatar img uploaded
                res.status(409).json({
                    msg: "An error has ocurred trying to create the user",
                    error,
                    status: "error",
                });
            }
        } else {
            //validations with errors
            //TODO: delete avatar img uploaded
            res.status(400).json({
                msg: "the form has input errors",
                error: errors,
                returnData: req.body,
                status: "bad request",
            });
        }
    },
    edit: async (req, res) => {
        //form fields validations
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //validations without errors
            try {
                const user = req.student || req.admin;
                const { id } = req.params;
                const { id_user } = user;
                delete user.id;
                delete user.id_role;
                let result = {};
                if (req.student) {
                    const studentResult = await Student.update({ ...user }, { where: { id } });
                    const userResult = await User.update({ ...user }, { where: { id: id_user } });
                    result = {
                        studentResult,
                        userResult,
                    }
                };
                if (req.admin) {
                    const userResult = await User.update({ user }, { where: { id: id_user } });
                    result = { userResult };
                }
                res.status(200).json({
                    msg: "user updated successfully",
                    data: result,
                    status: "success",
                });
            } catch (error) {
                console.log(error);
                //TODO: delete avatar img uploaded
                res.status(409).json({
                    msg: "An error has ocurred trying to edit the user",
                    error,
                    status: "error",
                });
            }
        } else {
            //validations with errors
            //TODO: delete avatar img uploaded
            res.status(400).json({
                msg: "the form has input errors",
                error: errors,
                returnData: req.body,
                status: "bad request",
            });
        }
    },
    editPass: async (req, res) => {
        //form fields validations
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //validations without errors
            try {
                const { id } = req.params;
                const { password, oldPassword } = req.body;
                const { password: storedPassword } = req.user;
                const auth = await bcrypt.compare(oldPassword, storedPassword);
                if (auth) {
                    await User.update(
                        {
                            password: await bcrypt.hash(password),
                        },
                        {
                            where: { id }
                        }
                    );
                    res.status(200).json({
                        msg: "Passwod changed successfully",
                        status: "success",
                    });
                } else {
                    res.status(401).json({
                        msg: "The original password was wrong",
                        status: "unauthorized",
                    });
                }
            } catch (error) {
                console.log(error);
                res.status(409).json({
                    msg: "An error has ocurred trying to change the user's password",
                    error,
                    status: "error",
                });
            }
        } else {
            res.status(400).json({
                msg: "the form has input errors",
                error: errors,
                returnData: req.body,
                status: "bad request",
            });
        }
    },
    //TODO: FOR IMPLEMENT EVENTLY
    /*
    editImg: (req, res) => {
        res.send("change user avatar");
    },
    */
    delete: async (req, res) => {
        try {
            const user = req.student || req.admin;
            const { id } = req.params;
            const { id_user } = user;
            let result = {};
            if (req.admin) {
                const studentResult = await Student.destroy({ where: { id } });
                const userResult = await User.destroy({ where: { id: id_user } });
                result = {
                    studentResult,
                    userResult,
                }
            } else {
                res.status(403).json({
                    msg: "You don't have required permissions",
                    status: "Unauthorized"
                })
            }
            res.status(200).json({
                msg: "user deleted successfully",
                // data: result,
                status: "success",
            });
        } catch (error) {
            res.status(409).json({
                msg: "An error has ocurred trying to delete the user",
                error,
                status: "error",
            });
        }
    },
};
