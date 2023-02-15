const { Router } = require('express');
const router = Router();

//controller
const responsibleController = require('../controllers/responsibleController');

//middlewares
const { userIsAdmin } = require('../middlewares/authMiddlewares/authMiddlewares');

//outes
router.get('/responsible/add', responsibleController.getResponsible);
router.post('/responsible/add', responsibleController.responsibleCreate);
router.put('/responsible/edit/:id', responsibleController.responsibleUpgrade);
router.delete('/responsible/delete/:id', responsibleController.responsibleDelete);

module.exports = router;
