const { validationResult } = require('express-validator');
const { User } = require('../database/models');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');

module.exports = {
    get: async (req, res) => {
        try {
            const listUsers = await User.findAll({
                attributes: ["name", "lastname", "email", "id_role"]
            });
            res.status(200).json({
                count: listUsers.length,
                data: listUsers,
                status: "success",
            })
        } catch (error) {
            //TODO: Create a helper endpoint error respons
            res.status(409).json({
                msg: "An error has ocurred trying to bring the users",
                error,
                status: "error"
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const user = await User.findOne({
                attributes: ["name", "lastname", "email", "id_role"],
                where: { id }
            })
            res.status(200).json({
                msg: "user found",
                data: user,
                status: "success",
            })
        } catch (error) {
            res.status(409).json({
                msg: "An error has ocurred trying to bring the user",
                error,
                status: "error"
            })
        }
    },
    add: async (req, res) => {
        //form fields validations
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //validations without errors
            const { user } = req;
            if (user) {     //user exists
                //TODO: delete avatar img uploaded
                res.status(409).json({
                    msg: "invalid or existing username",
                    returnData: req.body,
                    satatus: "denied",
                })
            } else {    //new user
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
                    })
                } catch (error) {
                    //TODO: delete avatar img uploaded
                    res.status(409).json({
                        msg: "An error has ocurred trying to create the user",
                        error,
                        status: "error"
                    })
                }
            }
        } else {
            //validations with errors
            //TODO: delete avatar img uploaded
            res.status(400).json({
                msg: "the form has input errors",
                error: errors,
                returnData: req.body,
                status: "bad request"
            })
        }
    },
    edit: (req, res) => {
        res.send("modifying an existing user");
    },
    editPass: (req, res) => {
        res.send("change user password");
    },
    editImg: (req, res) => {
        res.send("change user avatar");
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const result = User.destroy({ where: { id } });
            res.status(200).json({
                msg: "user deleted successfully",
                data: result,
                status: "success",
            })
        } catch (error) {
            res.status(409).json({
                msg: "An error has ocurred trying to delete the user",
                error,
                status: "error"
            })
        }
    }
}