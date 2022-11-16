const { Router } = require('express');
const router = Router();

//controller
const userController = require('../controllers/userController');

//middlewares
const { validatesCreateForm } = require('../middlewares/userForm/validationsFields');

//user routes
//read
router.get("/", userController.get);
router.get("/:id", userController.getById);
//create
router.post("/add", validatesCreateForm, userController.add);
//update
router.post("/edit/:id", userController.edit);
router.patch("/changePass/:id", userController.editPass);
router.patch("/changeImg/:id", userController.editImg);
//delete
router.delete("/:id", userController.delete);

module.exports = router;