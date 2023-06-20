const express =  require("express")                              // importing express will helpto run our file on port
const dbConnect = require("./dbConnect");            // impoting the dataase
const bcrypt = require("bcrypt");          // we need to hash encrypt the password so we use bcrypt for that 
const User = require("./dbModel");
const jwt = require("jsonwebtoken"); 
const auth = require('./auth')             //importing the model -- schema 

const app = express();

dbConnect();                      //calling the database 

app.use(express.json());
// adds middlewar to your app
//it parses incoming requests to JSON

const port = 8000;

// parses incoming requests with url encoded payloads
app.use(express.urlencoded({extended : true}))


app.get("/", (req,res, next)=>{
    res.json({
        message:"Hey this is your server response"
    })
    next();
})

// register endpoints ---- .then, .catch,. finally
// making request --- post-- used for create function 
// basically creating an api --- which has body(it has all the status) and head(actuall data used in the backend) 
app.post("/register", (req,res,) =>{
    //hashing the password
    bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
        const user = new User({

            //req.body.data --> used to extract the data 
            email: req.body.email,
            password:hashedPassword

        })
        //saving the data
        user.save().then((result)=>{
            res.status(201).send({
                messsage :"User was created succesfully",
                result
            });
        }).catch((err)=>{
            res.status(500).send({
                messsage :"Error in creating the user",err
            })
        })
    }).catch(err =>{
        res.status(500,{
            message : " Password was not hashed", err
        })
    })

    
})


//Login endpoint
app.post("/login",(req,res)=>{
    //checking if email user enters exists or not
    User.findOne({email : req.body.email})
    .then((user) => {
        console.log(user)
        res.status(200).send({
            message:"Email found"
        })
        bcrypt.compare( req.body.password ,user.password)
        .then((passwordCheck) =>{
            if(!passwordCheck){
                return res.status(400).send({
                    message:"password do not match"
                })
            }

            // create jwt token 
             const token = jwt.sign({
                userId : user._id,
                userEmail : user.email
             }, "RANDOM_TAKEN", {expiresIn : "24h"})

             //return a success message
        })
        res.status(200).send({
            message: "Login successful",
            email : user.email,
            token
         })

    })
    .catch(err =>{
        res.status(404).send({
            message:"Email not found", err
        })
    })
})

//public endpoint freely available to all the users
app.get("/public-endpoint", (req,res) =>{
    res.json({
        message:"you are free to access this route any time"
    })
})

//private -endpoint
app.get("/private-endpoint",auth,(req,res)=>{
    res.json({
        message:"you are authorised to access this private route"
    })
})

app.get("/private-endpoint-two",auth,(req,res)=>{
    res.json({
        message:"you are authorised to access orders route"
    })
})

app.listen(port, () =>{
    console.log(`app is ruuning on localhost${port}`)
})
