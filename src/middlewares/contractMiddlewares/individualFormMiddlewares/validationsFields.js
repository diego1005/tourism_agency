const { check } = require("express-validator");
const path = require("path");

const validates = {
    //create individual contracts validations
    validatesCreateForm: [
        check("indicated_date").notEmpty().withMessage("This field is required"),
        check("indicated_value").notEmpty().withMessage("This field is required"),
        check("payment_method").notEmpty().withMessage("This field is required"),
        check("user_admin").notEmpty().withMessage("This field is required"),
        check("student").notEmpty().withMessage("This field is required"),
        check("state").notEmpty().withMessage("This field is required"),
    ],
    //Edit individual contracts validations
    validatesEditForm: [
        check("indicated_date").notEmpty().withMessage("This field is required"),
        check("indicated_value").notEmpty().withMessage("This field is required"),
        check("payment_method").notEmpty().withMessage("This field is required"),
        check("student").notEmpty().withMessage("This field is required"),
        check("state").notEmpty().withMessage("This field is required"),
    ],
}

module.exports = validates;