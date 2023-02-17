const { Router } = require('express');
const router = Router();

//controller
const authController = require('../controllers/authController');

//middlewares
const { tokenIsValid } = require('../middlewares/authMiddlewares/authMiddlewares');
const { userExist } = require('../middlewares/userMiddlewares/userMiddlewares');
const { validatesLoginForm } = require('../middlewares/userMiddlewares/validationsFields');

//routes
router.post('/login', [validatesLoginForm, userExist], authController.login);
// router.get('/checkToken', [tokenIsValid], authController.checkToken);

module.exports = router;
