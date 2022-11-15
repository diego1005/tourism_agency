const { Router } = require('express');
const router = Router();

const userRoutes = require('./user.routes');

//response of index route
router.get("/", (req, res) => res.send("Hello world"));

//routes
router.use("/user", userRoutes);

module.exports = router;

