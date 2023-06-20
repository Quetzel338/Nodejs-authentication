const mongoose = require("mongoose");


// schema defines the structure of the model
const userSchema = new mongoose.Schema({

    // creating feilds in the schema
    // name:{
    //     type:String,
    //     required :[true,"Please enter a name"],
    //     unique:false
    // },

    // number:{
    //     type:Number,
    //     unique:[true,"Phone number already exists"]

    // },
    email:{
        type : String,
        // it is mandatory and should be unique
        required:[true,"please provide an email"],
        unique:[true,"Email alreay exist"]
    },

    password :{
        type :String,
        required:[true,"please provide an email"],
        unique:false
    }
});

//exporting the data to our data base and checking if there exists a table named users then 
// add add schema to add otherwise create a table users and then add the schema
module.exports = mongoose.model.users || mongoose.model("users", userSchema)