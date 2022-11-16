const { Router } = require('express');
const router = Router();

//controller
const authController = require('../controllers/authController');

//auth routes
//login
router.post("/", authController.login);

module.exports = router;