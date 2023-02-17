const { Router } = require('express');
const router = Router();

//controller
const passengerController = require('../controllers/passengerController');

//middlewares
const { tokenIsValid } = require('../middlewares/authMiddlewares/authMiddlewares');

//outes
router.get('/', tokenIsValid, passengerController.getPassengers);
router.post('/', tokenIsValid, passengerController.passengerCreate);
router.put('/:id', tokenIsValid, passengerController.passengerUpgrade);
router.delete('/:id', tokenIsValid, passengerController.passengerDelete);

module.exports = router;
