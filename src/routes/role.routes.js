const { Router } = require('express');
const router = Router();

//controller
const roleController = require('../controllers/roleController');

//middlewares
//role middlewares
const { roleExist } = require('../middlewares/roleMiddlewares/roleMiddlewares');
//auth middlewares
const { userIsAdmin } = require('../middlewares/authMiddlewares/authMiddlewares');

//role routes
router.get("/", userIsAdmin, roleController.get);
router.post("/add", userIsAdmin, roleController.create);
router.delete("/delete/:id", userIsAdmin, roleExist, roleController.delete);

module.exports = router;