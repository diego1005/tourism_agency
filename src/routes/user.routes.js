const { Router } = require("express");
const router = Router();

//controller
const userController = require("../controllers/userController");

//middlewares
//form middlewares
const { validatesCreateForm, validatesEditForm, validatesChangePass } = require("../middlewares/userFormMiddlewares/validationsFields");
//user middlewares
const { userExist, userAlreadyExist, roleUser } = require("../middlewares/userMiddlewares/userMiddlewares");
//auth middlewares
const { checkToken } = require("../middlewares/authMiddlewares/authMiddlewares");

//user routes
//read
router.get("/", userController.get);
router.get("/:id", checkToken, userExist, userController.getById);
//create
router.post("/add", validatesCreateForm, userAlreadyExist, roleUser, userController.create);
//update
router.put("/edit/:id", validatesEditForm, checkToken, userExist, userController.edit);
router.patch("/changePass/:id", validatesChangePass, checkToken, userExist, userController.editPass);
//TODO: FOR IMPLEMENT EVENTLY
// router.patch("/changeImg/:id", userExist, userController.editImg);
//delete
router.delete("/:id", userExist, userController.delete);

module.exports = router;
