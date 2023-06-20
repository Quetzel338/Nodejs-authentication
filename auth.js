const jwt = require("jsonwebtoken");

//create an export asynchronous function in which we will write our authorisation logic 
module.exports = async(req,res,next) => {
    try{
        // get the authorisation header

        //console.log(req.header)
        const token = await req.header.authorization.split(" ")[1];
        //console.log(req.headers)

        //check if token matches the origin
        const decodedToken = jwt.verify(token, "RANDOM-TOKEN")

        console.log(decodedToken);
        //retrieve the user details of the logged in user
        const user = decodedToken;

        //pass the user down to the protected end points
        req.user = user;

        //pass down the funtionality to the endpoint
        next();
    }
    catch(err){
        res.status(401).json({
            err : new Error("Invalid Request")
        })
    }
}