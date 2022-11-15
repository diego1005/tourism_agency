const express = require('express');
const app = express();

const indexRoutes = require('./routes/index.routes');

//Settings
const port = process.env.PORT || 3001;

//Routes
app.use("/", indexRoutes);

//Server
app.listen(port, () => {
    console.log(`Server run on port: ${port}`);
})