const express = require('express');
const app = express();
const cors = require('cors');

const indexRoutes = require('./routes/index.routes');

//Settings
const port = process.env.PORT || 3001;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//Routes
app.use("/", indexRoutes);

//Server
app.listen(port, () => {
    console.log(`Server run on port: ${port}`);
})