const { Router } = require('express');
const router = Router();

//rutes files
const indContractRoutes = require('./contracts/individual.routes');
const genContractRoutes = require('./contracts/general.routes');

//Middleware
//auth middlewares
const { tokenIsValid } = require('../middlewares/authMiddlewares/authMiddlewares');

//routes
router.use('/individuals', tokenIsValid, indContractRoutes);
router.use('/generals', tokenIsValid, genContractRoutes);

module.exports = router;
