const { Router } = require('express');
const router = Router();

//controller
const passengerController = require('../controllers/passengerController');

//middlewares
const { tokenIsValid, isUser, isAdmin } = require('../middlewares/auth/authMiddlewares');
const { passengerExist, passengerAlreadyExist } = require('../middlewares/passenger/passengerMiddlewares');
const { validatesCreateForm } = require('../middlewares/passenger/validationsFields');

//routes
router.get('/', [tokenIsValid, isUser], passengerController.get);
router.get('/:id', [tokenIsValid, isUser, passengerExist], passengerController.getById);
router.post('/', [tokenIsValid, isUser, validatesCreateForm, passengerAlreadyExist], passengerController.create);
router.put('/:id', [tokenIsValid, isUser, validatesCreateForm, passengerExist], passengerController.edit);
router.delete('/:id', [tokenIsValid, isAdmin], passengerController.delete);

module.exports = router;
