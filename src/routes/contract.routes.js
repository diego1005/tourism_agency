const { Router } = require('express');
const router = Router();

//controller
const generalContractController = require('../controllers/contracts/generalController');
const individualContractController = require('../controllers/contracts/individualController');

//middlewares
const { tokenIsValid, isUser, isAdmin } = require('../middlewares/auth/authMiddlewares');
const { generalContractExist, generalContractAlreadyExist } = require('../middlewares/contracts/general/generalContractMiddlewares');
const { individualContractExist } = require('../middlewares/contracts/individual/individualContractMiddlewares');
const { validatesCreateForm } = require('../middlewares/contracts/general/validationsFields');
const { validatesCreateForm: validatesCreateFormIndividual } = require('../middlewares/contracts/individual/validationsFields');

//routes -- GENERAL CONTRACTS
router.get('/general', [tokenIsValid, isUser], generalContractController.get);
router.get('/general/:id', [tokenIsValid, isUser, generalContractExist], generalContractController.getById);
router.post('/general', [tokenIsValid, isUser, validatesCreateForm, generalContractAlreadyExist], generalContractController.create);
router.put('/general/:id', [tokenIsValid, isUser, validatesCreateForm, generalContractExist], generalContractController.edit);
router.delete('/general/:id', [tokenIsValid, isAdmin], generalContractController.delete);

//routes -- INDIVIDUAL CONTRACTS
router.get('/individual', [tokenIsValid, isUser], individualContractController.get);
router.get('/individual/:id', [tokenIsValid, isUser, individualContractExist], individualContractController.getById);
router.post('/individual', [tokenIsValid, isUser, validatesCreateFormIndividual], individualContractController.create);
router.put(
  '/individual/:id',
  [tokenIsValid, isUser, validatesCreateFormIndividual, individualContractExist],
  individualContractController.edit
);
router.delete('/individual/:id', [tokenIsValid, isAdmin], individualContractController.delete);

module.exports = router;
