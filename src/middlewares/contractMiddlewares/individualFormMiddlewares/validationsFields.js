const { check } = require("express-validator");
const path = require("path");

const validates = {
    //create individual contracts validations
    validatesCreateForm: [
        check("fecha_contrato").notEmpty().withMessage("Este campo es requerido"),
        check("valor_contrato").notEmpty().withMessage("Este campo es requerido"),
        check("saldo").notEmpty().withMessage("Este campo es requerido"),
        check("estado").notEmpty().withMessage("Este campo es requerido"),
        check("ficha_medica").notEmpty().withMessage("Este campo es requerido"),
    ],
    //Edit individual contracts validations
    validatesEditForm: [
        check("fecha_contrato").notEmpty().withMessage("Este campo es requerido"),
        check("valor_contrato").notEmpty().withMessage("Este campo es requerido"),
        check("saldo").notEmpty().withMessage("Este campo es requerido"),
        check("estado").notEmpty().withMessage("Este campo es requerido"),
        check("ficha_medica").notEmpty().withMessage("Este campo es requerido"),
    ],
}

module.exports = validates;