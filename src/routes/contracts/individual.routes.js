const { Router } = require("express");
const router = Router();

//controller
const indContractController = require('../../controllers/contracts/indContractController');

//Middlewares
//form middlewares
const { validatesCreateForm, validatesEditForm } = require('../../middlewares/contractMiddlewares/individualFormMiddlewares/validationsFields');
//individual contract middlewares
const { individualContractExist, contractNumber } = require('../../middlewares/contractMiddlewares/individualContractMiddlewares');


//individual contracts routes
//read
router.get("/", indContractController.get);
router.get("/:dni", individualContractExist, indContractController.getByDni);
//create
//TODO: add middleware to check if this dni is associated to a individual contract already
router.post("/add", /*validatesCreateForm,*/ contractNumber, indContractController.create);
//uddate
router.put("/edit/:id", individualContractExist, validatesEditForm, indContractController.edit);
//delete
router.delete("/delete/:id", individualContractExist, indContractController.delete);


module.exports = router;