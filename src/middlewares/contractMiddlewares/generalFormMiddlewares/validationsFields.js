const { check } = require("express-validator");
const path = require("path");

const validates = {
    //create general contracts validations
    validatesCreateForm: [
        check("fecha_contrato").notEmpty().withMessage("Este campo es requerido"),
        check("valor_contrato").notEmpty().withMessage("Este campo es requerido"),
        check("descripcion").notEmpty().withMessage("Este campo es requerido"),
        check("fecha_viaje").notEmpty().withMessage("Este campo es requerido"),
        check("cupo_pasajeros").notEmpty().withMessage("Este campo es requerido"),
        check("grado").notEmpty().withMessage("Este campo es requerido"),
        check("division").notEmpty().withMessage("Este campo es requerido"),
        check("turno").notEmpty().withMessage("Este campo es requerido"),
    ],
    //Edit general contracts validations
    validatesEditForm: [
        check("fecha_contrato").notEmpty().withMessage("Este campo es requerido"),
        check("valor_contrato").notEmpty().withMessage("Este campo es requerido"),
        check("descripcion").notEmpty().withMessage("Este campo es requerido"),
        check("fecha_viaje").notEmpty().withMessage("Este campo es requerido"),
        check("cupo_pasajeros").notEmpty().withMessage("Este campo es requerido"),
        check("grado").notEmpty().withMessage("Este campo es requerido"),
        check("division").notEmpty().withMessage("Este campo es requerido"),
        check("turno").notEmpty().withMessage("Este campo es requerido"),
    ],
}

module.exports = validates;