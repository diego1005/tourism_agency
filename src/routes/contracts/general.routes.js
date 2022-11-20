const { Router } = require("express");
const router = Router();

//controller
const { genContractController } = rquire('../../controllers/contracts/genContractController');

//Middlewares
//form validates middlewares
const { validatesCreateForm, validatesEditForm } = require("../../middlewares/contractFormMiddlewares/generalFormContracts/validationsFields");
//general contract middlewares
const { generalContractExist } = require("../../middlewares/contractMiddlewares/generalContractMiddlewares");

//general contracts routes
//read
router.get("/", genContractController.get);
router.get("/:id", generalContractExist, genContractController.getByid);
//create
//TODO: add middleware to check if this individual contract is associated to a general contract already
router.post("/add", validatesCreateForm, genContractController.create);
//uddate
router.put("/edit/:id", generalContractExist, validatesEditForm, genContractController.edit);
//delete
router.delete("/delete/:id", generalContractExist, genContractController.delete);


module.exports = router;