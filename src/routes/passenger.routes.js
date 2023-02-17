const { Router } = require('express');
const router = Router();

//controller
const passengerController = require('../controllers/passengerController');

//middlewares
const { userIsAdmin } = require('../middlewares/authMiddlewares/authMiddlewares');

//outes
router.get('/', userIsAdmin, passengerController.getPassengers);
router.post('/', userIsAdmin, passengerController.passengerCreate);
router.put('/:id', userIsAdmin, passengerController.passengerUpgrade);
router.delete('/:id', userIsAdmin, passengerController.passengerDelete);

module.exports = router;
