const { Router } = require("express");
const router = Router();

//rutes files
const indContractRoutes = require('./individual.routes');
const genContractRoutes = require('./general.routes');

//Middleware
//auth middlewares
const { userIsAdmin } = require('../middlewares/authMiddlewares/authMiddlewares');

//routes
router.use("/individual", userIsAdmin, indContractRoutes);
router.use("/general", userIsAdmin, genContractRoutes);

module.exports = router;