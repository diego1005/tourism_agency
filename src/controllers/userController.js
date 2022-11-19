const { validationResult } = require("express-validator");
const { User } = require("../database/models");
const bcrypt = require("../helpers/bcrypt");
const jwt = require("../helpers/jwt");

module.exports = {
    get: async (req, res) => {
        try {
            const listUsers = await User.findAll({
                attributes: ["name", "lastname", "email", "id_role"],
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
    getById: async (req, res) => {
        try {
            res.status(200).json({
                msg: "user found",
                data: req.user,
                status: "success",
            });
        } catch (error) {
            res.status(409).json({
                msg: "An error has ocurred trying to bring the user",
                error,
                status: "error",
            });
        }
    },
    add: async (req, res) => {
        //form fields validations
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //validations without errors
            //new user
            try {
                const { name, lastname, email, password } = req.body;
                const { dataValues: newUser } = await User.create({
                    name,
                    lastname,
                    email,
                    password: await bcrypt.hash(password),
                });
                //delete password from newUser data
                delete newUser.password;
                //generates token
                const token = jwt.sign(newUser);
                res.status(200).json({
                    msg: "user created successfully",
                    data: newUser,
                    token,
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
                const { id } = req.params;
                const { name, lastname, email } = req.body;
                await User.update(
                    {
                        name,
                        lastname,
                        email,
                    },
                    {
                        where: { id },
                    }
                );
                res.status(200).json({
                    msg: "user updated successfully",
                    status: "success",
                });
            } catch (error) {
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
                        msg: "passwod changed successfully",
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
            const { id } = req.params;
            const result = await User.destroy({ where: { id } });
            res.status(200).json({
                msg: "user deleted successfully",
                data: result,
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
