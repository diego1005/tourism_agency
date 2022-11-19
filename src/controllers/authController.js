const { validationResult } = require("express-validator");
const bcrypt = require("../helpers/bcrypt");
const jwt = require("../helpers/jwt");

module.exports = {
    login: async (req, res) => {
        //form fields validations
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            //validations without errors
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
                const token = jwt.sign(req.user)
                res.status(200).json({
                    msq: "user logged in successfully",
                    token,
                    status: "success"
                })
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
}
