const express=require('express');
const app= express();
const { DBConnection }= require('./database/db.js');
const User=require('./models/Users.js');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');
const dotenv= require('dotenv');
const  router= require('./routes/routes.js')
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config();

app.listen(3000,()=>{
    console.log("listening to port 3000");
})
//MIDDLEWARES
app.use(express.json());
app.use(cookieParser())
//for accepting form data
app.use(express.urlencoded({extended: true}));


const corsOptions = {
    origin: 'http://localhost:3001', // Allow only this origin
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use('/',router);

DBConnection(); 
app.get("/",(req,res)=>{
    res.send("hi")
})
/*
app.post("/register", async (req,res)=>  {
    //get alll the data from req body
  
    try{
        const {firstname,lastname,email,password} = req.body;

        if(!(firstname && lastname && email && password)){
            return res.status(400).send("please eneter all required fields")
        }
       
        //check that all the data should exist
        const existingUser = await User.findOne({email});
        if(existingUser){
        return res.status(400).send("User already exists");
        }
        
        const hashPassword = await bcrypt.hash(password,10);
       
        //save user
        const user=await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword
        });
         
         const token = jwt.sign({id:user._id,email}, process.env.SECRET_KEY,{
            expiresIn: "1h"
         });
         user.token = token;
         user.password = undefined;
         res.status(201).json({
            message: "You have successfully registered",
            user
         });

    }
    catch(error){
        console.log(error)
    }
})


app.post("/login", async (req,res)=>{
    try{
       const {email,password} = req.body;
       if(!(email && password)){
        return res.status(400).send("Please enter all required fields");
       }

       const existingUser= await User.findOne({email});
       if(!existingUser){
        return res.status(401).send("User doesn't exist");
       }
       
       const pwd= await bcrypt.compare(password, existingUser.password);
       if (!pwd) {
           return res.status(401).send("Password is incorrect");
       }

       const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      existingUser.token = token;
      existingUser.password = undefined;

  
       const options = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true, 
       };


      res.status(200).cookie("token", token, options).json({
        message: "You have successfully logged in!",
        success: true,
        token,
      });
    }
    catch(error){
       console.log("error",error);
    }
})*/