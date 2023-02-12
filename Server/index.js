require('dotenv').config();
const express = require("express");
const sequelize = require('./db');
const router = require("./routes/index");

const PORT = process.env.PORT || 5000;

const app = express();
app.use("/api", router);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); 
        app.listen(PORT, () => console.log(`Server started on port  ${PORT}`));
    } catch (e){
        console.log(e);
    }
}

start();
