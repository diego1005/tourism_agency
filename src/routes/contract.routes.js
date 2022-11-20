const { Router } = require("express");
const router = Router();

//rutes files
const indContractRoutes = require('./individual.routes');
const genContractRoutes = require('./general.routes');

//routes
router.use("/individual", indContractRoutes);
router.use("/general", genContractRoutes);

module.exports = router;