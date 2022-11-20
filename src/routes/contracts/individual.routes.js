const { Router } = require("express");
const router = Router();

//controller
const { indContractController } = rquire('../../controllers/contracts/indContractController');

//Middlewares
//form middlewares
const { validatesCreateForm, validatesEditForm } = require("../../middlewares/contractFormMiddlewares/individualFormContracts/validationsFields");
//individual contract middlewares
const { individualContractExist } = require('../../middlewares/contractMiddlewares/individualContractMiddlewares');


//individual contracts routes
//read
router.get("/", indContractController.get);
router.get("/:dni", individualContractExist, indContractController.getByDni);
//create
//TODO: add middleware to check if this dni is associated to a individual contract already
router.post("/add", validatesCreateForm, indContractController.create);
//uddate
router.put("/edit/:id", individualContractExist, validatesEditForm, indContractController.edit);
//delete
router.delete("/delete/:id", individualContractExist, indContractController.delete);


module.exports = router;