const { Router } = require("express");
const router = Router();

//controller
const genContractController = require('../../controllers/contracts/genContractController');
const stateGenController = require('../../controllers/contracts/stateGenController');

//Middlewares
//form validates middlewares
const { validatesCreateForm, validatesEditForm } = require('../../middlewares/contractMiddlewares/generalFormMiddlewares/validationsFields');
//general contract middlewares
const { generalContractExist, contractNumber } = require("../../middlewares/contractMiddlewares/generalContractMiddlewares");
//state contract middlewares
const { stateGeneralExist } = require("../../middlewares/contractMiddlewares/stateContractMiddlewares");

//general contracts routes
//read
router.get("/list", genContractController.get);
router.get("/:id", generalContractExist, genContractController.getById);
//create
//TODO: add middleware to check if this individual contract is associated to a general contract already
router.post("/add", validatesCreateForm, contractNumber, genContractController.create);
//uddate
router.put("/edit/:id", generalContractExist, validatesEditForm, genContractController.edit);
//delete
router.delete("/delete/:id", generalContractExist, genContractController.delete);

//state general contracts routes
//read
router.get("/state/all/:idState", stateGeneralExist, stateGenController.getAllContractsByState); //get all contract with that state
router.get("/state/:idContract", generalContractExist, stateGenController.getStateByContract); //get state of specific contract
//create
router.post("/state/add", stateGenController.create);
//update
router.put("/state/:id", stateGenController.edit);
//delete
router.delete("/state/:id", stateGenController.delete);


module.exports = router;