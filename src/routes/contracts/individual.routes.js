const { Router } = require("express");
const router = Router();

//controller
const indContractController = require('../../controllers/contracts/indContractController');
const stateIndController = require('../../controllers/contracts/stateIndController');

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
//update
router.put("/edit/:id", individualContractExist, validatesEditForm, indContractController.edit);
//delete
router.delete("/delete/:id", individualContractExist, indContractController.delete);

//state individual contracts routes
//read
router.get("/state", stateIndController.get);
router.get("/state/:id", stateIndController.getByContract);
//create
router.post("/state/add", stateIndController.create);
//update
router.put("/state/:id", stateIndController.edit);
//delete
router.delete("/state/:id", stateIndController.delete);

module.exports = router;