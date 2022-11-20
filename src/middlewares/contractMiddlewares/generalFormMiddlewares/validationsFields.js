const { check } = require("express-validator");
const path = require("path");

const validates = {
    //create general contracts validations
    validatesCreateForm: [
        check("nro_contract").notEmpty().withMessage("This field is required"),
        check("indicated_date").notEmpty().withMessage("This field is required"),
        check("indicated_value").notEmpty().withMessage("This field is required"),
        check("travel_date").notEmpty().withMessage("This field is required"),
        check("travel_destination").notEmpty().withMessage("This field is required"),
        check("state").notEmpty().withMessage("This field is required"),
        check("nro_individual").notEmpty().withMessage("This field is required"),
        check("responsible").notEmpty().withMessage("This field is required"),
    ],
    //Edit general contracts validations
    validatesEditForm: [
        check("indicated_date").notEmpty().withMessage("This field is required"),
        check("indicated_value").notEmpty().withMessage("This field is required"),
        check("travel_date").notEmpty().withMessage("This field is required"),
        check("travel_destination").notEmpty().withMessage("This field is required"),
        check("state").notEmpty().withMessage("This field is required"),
        check("nro_individual").notEmpty().withMessage("This field is required"),
        check("responsible").notEmpty().withMessage("This field is required"),
    ],
}

module.exports = validates;