const { Router } = require('express');
const router = Router();

//controller
const userController = require('../controllers/userController');

//user routes
router.get("/", userController.get);

module.exports = router;