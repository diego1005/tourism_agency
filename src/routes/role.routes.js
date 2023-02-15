const { Router } = require('express');
const router = Router();

//controller
const roleController = require('../controllers/roleController');

//middlewares
const { roleExist } = require('../middlewares/roleMiddlewares/roleMiddlewares');
const { userIsAdmin } = require('../middlewares/authMiddlewares/authMiddlewares');

//outes
router.get('/', userIsAdmin, roleController.get);
router.post('/add', userIsAdmin, roleController.create);
router.delete('/delete/:id', userIsAdmin, roleExist, roleController.delete);

module.exports = router;
