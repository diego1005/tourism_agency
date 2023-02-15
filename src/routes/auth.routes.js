const { Router } = require('express');
const router = Router();

//controller
const authController = require('../controllers/authController');

//middlewares
const { checkToken } = require('../middlewares/authMiddlewares/authMiddlewares');
const { userExist } = require('../middlewares/userMiddlewares/userMiddlewares');
const { validatesLoginForm } = require('../middlewares/userFormMiddlewares/validationsFields');

//routes
router.post('/login', validatesLoginForm, userExist, authController.login);
router.get('/checkToken', checkToken, authController.checkToken);

module.exports = router;
