const { Router } = require('express');
const router = Router();

//routes files
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const roleRoutes = require('./role.routes');
const contractRoutes = require('./contract.routes');
const commonRoutes = require('./common.routes');

//response of index route
router.get('/', (req, res) => res.send('Hello world'));

//routes
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/role', roleRoutes);
router.use('/contract', contractRoutes);
router.use('/common', commonRoutes);

module.exports = router;
