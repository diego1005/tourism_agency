const { Router } = require('express');
const router = Router();

//controller
const authController = require('../controllers/authController');

//middlewares
//form middlewares
const { validatesLoginForm } = require("../middlewares/userFormMiddlewares/validationsFields");
//user middlewares
const { userExist } = require('../middlewares/userMiddlewares/userMiddlewares');
//auth middlewares
const { checkToken } = require("../middlewares/authMiddlewares/authMiddlewares");

//auth routes

//login
router.post("/login", validatesLoginForm, userExist, authController.login);
//check token
router.get("/checkToken", checkToken, authController.checkToken);
//logout
router.get("/logout", authController.logout);

module.exports = router;