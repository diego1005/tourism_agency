const { Router } = require('express');
const router = Router();

//controller
const userController = require('../controllers/userController');

//middlewares
const { userExist, userAlreadyExist, roleUser } = require('../middlewares/userMiddlewares/userMiddlewares');
const { userIsAdmin } = require('../middlewares/authMiddlewares/authMiddlewares');
const { validatesCreateForm, validatesEditForm, validatesChangePass } = require('../middlewares/userFormMiddlewares/validationsFields');

//routes
router.get('/', userIsAdmin, userController.get);
router.get('/:id', userIsAdmin, userExist, userController.getById);
router.post('/', userIsAdmin, validatesCreateForm, userAlreadyExist, userController.create);
router.put('/:id', userIsAdmin, validatesEditForm, userExist, userController.edit);
router.patch('/:id', userIsAdmin, validatesChangePass, userExist, userController.editPass);
router.delete('/:id', userIsAdmin, userExist, userController.delete);

module.exports = router;
