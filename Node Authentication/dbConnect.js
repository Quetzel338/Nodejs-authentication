const mongoose = require("mongoose")
require('dotenv').config()

async function dbConnection(){
    mongoose.connect(process.env.DB_URL)
    .then(() => {console.log(" succesfully Connected")})
    .catch((err) =>{
        console.log("Unable to connect");
        console.log("error" ,err);
    })
}

module.exports = dbConnection;