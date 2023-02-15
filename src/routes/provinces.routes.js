const { Router } = require('express');
const router = Router();

//controller
const provincesController = require('../controllers/provincesController');

//middlewares
const { userIsAdmin } = require('../middlewares/authMiddlewares/authMiddlewares');

//outes
router.get('/', userIsAdmin, provincesController.get);

module.exports = router;
