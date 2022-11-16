const { validationResult } = require('express-validator');
const User = require('../database/models');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');

module.exports = {
    get: (req, res) => {
        res.send("there are all users");
    },
    getById: (req, res) => {
        res.send("there is a user");
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
                    const newUser = await User.create({
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

        }
        res.send("creating a new user");
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
    delete: (req, res) => {
        res.send("delete an existing user");
    }
}