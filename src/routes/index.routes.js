const { Router } = require('express');
const router = Router();

//routes files
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const roleRoutes = require('./role.routes');
const contractRoutes = require('./contract.routes');

//response of index route
router.get("/", (req, res) => res.send("Hello world"));

//routes
router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/role", roleRoutes);
router.use("/contract", contractRoutes);

module.exports = router;

