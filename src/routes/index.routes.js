const { Router } = require('express');
const router = Router();

//routes files
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');

//response of index route
router.get("/", (req, res) => res.send("Hello world"));

//routes
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;

