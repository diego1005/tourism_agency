const { Router } = require('express');
const router = Router();

//controller
const cityController = require('../controllers/cityController');

//middlewares
const { userIsAdmin } = require('../middlewares/authMiddlewares/authMiddlewares');

//outes
router.get('/', userIsAdmin, cityController.getCity);
router.post('/', userIsAdmin, cityController.cityCreate);
router.put('/:id', userIsAdmin, cityController.cityUpgrade);
router.delete('/id', userIsAdmin, cityController.cityDelete);

module.exports = router;
