const { Router } = require("express");
const router = Router();

//controller
const { indContractController } = rquire('../../controllers/contracts/indContractController');

//Middlewares
const { validatesCreateForm, validatesEditForm } = require("../../middlewares/contractFormMiddlewares/individualContracts/validationsFields");

//individual contracts routes
//read
router.get("/", indContractController.get);
router.get("/:dni", indContractController.getByDni);
//create
router.post("/add", validatesCreateForm, indContractController.create);
//uddate
router.put("/edit/:id", validatesEditForm, indContractController.edit);
//delete
router.delete("/delete/:id", indContractController.delete);


module.exports = router;