const { Router } = require('express');
const router = Router();

//controller
const paymentController = require('../controllers/paymentController');

//middlewares
const { userIsAdmin } = require('../middlewares/authMiddlewares/authMiddlewares');

//outes
router.get('/', userIsAdmin, paymentController.getPayments);
router.post('/', userIsAdmin, paymentController.paymentCreate);
router.put('/:id', userIsAdmin, paymentController.paymentUpgrade);
router.delete('/id', userIsAdmin, paymentController.paymentDelete);

module.exports = router;
