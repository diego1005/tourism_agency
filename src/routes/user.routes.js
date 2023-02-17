const { Router } = require('express');
const router = Router();

//controller
const userController = require('../controllers/userController');

//middlewares
const { userExist, userAlreadyExist } = require('../middlewares/userMiddlewares/userMiddlewares');
const { tokenIsValid, isUser, isAdmin } = require('../middlewares/authMiddlewares/authMiddlewares');
const { validatesCreateForm, validatesEditForm, validatesChangePass } = require('../middlewares/userMiddlewares/validationsFields');

//routes
router.get('/', [tokenIsValid, isUser], userController.get);
router.get('/:id', [tokenIsValid, isUser, userExist], userController.getById);
router.post('/', [tokenIsValid, isAdmin, validatesCreateForm, userAlreadyExist], userController.create);
router.put('/:id', [tokenIsValid, isAdmin, validatesEditForm, userExist], userController.edit);
router.patch('/:id', [tokenIsValid, isUser, validatesChangePass, userExist], userController.editPass);
router.delete('/:id', [tokenIsValid, isAdmin, userExist], userController.delete);

module.exports = router;
