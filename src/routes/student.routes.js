const { Router } = require('express');
const router = Router();

//controller
const studentController = require('../controllers/studentController');

//middlewares
const { userIsAdmin } = require('../middlewares/authMiddlewares/authMiddlewares');

//outes
router.get('/', userIsAdmin, studentController.getStudents);
router.post('/', userIsAdmin, studentController.studentCreate);
router.put('/:id', userIsAdmin, studentController.studentUpgrade);
router.delete('/:id', userIsAdmin, studentController.studentDelete);

module.exports = router;
