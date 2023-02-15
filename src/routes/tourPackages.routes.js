const { Router } = require('express');
const router = Router();

//controller
const tourPackages = require('../controllers/tourPackagesController');

//middlewares
const { userIsAdmin } = require('../middlewares/authMiddlewares/authMiddlewares');

//outes
router.get('/', userIsAdmin, tourPackages.getDestinations);
router.post('/', userIsAdmin, tourPackages.destinationCreate);
router.put('/:id', userIsAdmin, tourPackages.destinationUpgrade);
router.delete('/:id', userIsAdmin, tourPackages.destinationDelete);

module.exports = router;
