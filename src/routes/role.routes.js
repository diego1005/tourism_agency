const { Router } = require('express');
const router = Router();

//controller
const roleController = require('../controllers/roleController');

//middlewares
const { roleExist } = require('../middlewares/roleMiddlewares/roleMiddlewares');
const { tokenIsValid, isUser } = require('../middlewares/authMiddlewares/authMiddlewares');

//outes
router.get('/', [tokenIsValid, isUser], roleController.get);
router.post('/add', [tokenIsValid, isUser], roleController.create);
router.delete('/delete/:id', [tokenIsValid, isUser], roleExist, roleController.delete);

module.exports = router;
