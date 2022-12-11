const { validationResult } = require("express-validator");
const bcrypt = require("../helpers/bcrypt");
const jwt = require("../helpers/jwt");

module.exports = {
    login: async (req, res) => {
        //form fields validations
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //validations without errors
            try {
                const { password: storedPassword } = req.user;
                const { password } = req.body;
                const auth = await bcrypt.compare(password, storedPassword);
                if (!auth) {
                    res.status(401).json({
                        msg: "Password doesn't match",
                        status: "Unauthorized",
                    });
                } else {
                    //creates security token
                    const { user } = req;
                    const token = jwt.sign(user)
                    res.status(200).json({
                        msq: "user logged in successfully",
                        token,
                        status: "success"
                    })
                }
            } catch (error) {
                res.status(409).json({
                    msg: "An error has ocurred trying to log in",
                    error,
                    status: "error",
                });
            }
        } else {
            //validations with errors
            res.status(400).json({
                msg: "the form has input errors",
                error: errors,
                returnData: req.body,
                status: "bad request",
            });
        }
    },
    checkToken: (req, res) => {
        const { id } = req.user;
        const { token } = req;
        res.status(200).json({
            msg: "token is valid",
            id: id,
            token: token,
            status: "success",
        })
    },
    logout: (req, res) => {
        try {
            req.headers.authorization = null;
            res.status(200).json({
                msg: "user logout successfully",
                status: "success"
            })
        } catch (error) {
            res.status(500).json({
                msg: "error when trying to logout user",
                error: error,
                status: "denied"
            })
        }
    }
}
