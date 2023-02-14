const { Router } = require('express');
const router = Router();

//controller
const userController = require('../controllers/userController');

//middlewares
//form middlewares
const { validatesCreateForm, validatesEditForm, validatesChangePass } = require('../middlewares/userFormMiddlewares/validationsFields');
//user middlewares
const { userExist, userAlreadyExist, roleUser } = require('../middlewares/userMiddlewares/userMiddlewares');
//auth middlewares
const { checkToken, userIsAdmin } = require('../middlewares/authMiddlewares/authMiddlewares');

//user routes
//read
router.get('/', userIsAdmin, userController.get);
router.get('/:id', userIsAdmin, userExist, userController.getById);
//create
router.post('/', userIsAdmin, validatesCreateForm, userAlreadyExist, userController.create);
//update
router.put('/:id', userIsAdmin, validatesEditForm, userExist, userController.edit);
router.patch('/:id', userIsAdmin, validatesChangePass, userExist, userController.editPass);
//TODO: FOR IMPLEMENT EVENTLY
// router.patch("/changeImg/:id", userExist, userController.editImg);
//delete
router.delete('/:id', userIsAdmin, userExist, userController.delete);

module.exports = router;
