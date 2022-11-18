const { Router } = require('express');
const router = Router();

//controller
const userController = require('../controllers/userController');

//middlewares
const { validatesCreateForm } = require('../middlewares/userForm/validationsFields');
const userExist = require('../middlewares/userRoutes/userExist');

//user routes
//read
router.get("/", userController.get);
router.get("/:id", userExist, userController.getById);
//create
router.post("/add", validatesCreateForm, userController.add);
//update
router.post("/edit/:id", userExist, userController.edit);
router.patch("/changePass/:id", userExist, userController.editPass);
//TODO: FOR IMPLEMENT EVENTLY
// router.patch("/changeImg/:id", userExist, userController.editImg);
//delete
router.delete("/:id", userExist, userController.delete);

module.exports = router;