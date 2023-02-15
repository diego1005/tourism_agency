const { Router } = require('express');
const router = Router();

//controller
const destinationController = require('../controllers/destinationController');

//middlewares
const { userIsAdmin } = require('../middlewares/authMiddlewares/authMiddlewares');

//outes
router.get('/', userIsAdmin, destinationController.getDestinations);
router.post('/', userIsAdmin, destinationController.destinationCreate);
router.put('/:id', userIsAdmin, destinationController.destinationUpgrade);
router.delete('/:id', userIsAdmin, destinationController.destinationDelete);

module.exports = router;
