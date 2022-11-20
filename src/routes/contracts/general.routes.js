const { Router } = require("express");
const router = Router();

//controller
const { genContractController } = rquire('../../controllers/contracts/genContractController');

//Middlewares
const { validatesCreateForm, validatesEditForm } = require("../../middlewares/contractFormMiddlewares/generalContracts/validationsFields");

//general contracts routes
//read
router.get("/", genContractController.get);
router.get("/:dni", genContractController.getByDni);
//create
router.post("/add", validatesCreateForm, genContractController.create);
//uddate
router.put("/edit/:id", validatesEditForm, genContractController.edit);
//delete
router.delete("/delete/:id", genContractController.delete);


module.exports = router;