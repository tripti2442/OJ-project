const User = require('../models/Users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




const signup = async (req, res) => {
    console.log(req.body.email);
    console.log("role",req.body.role);
    const dataObj = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
    
    if (req.body.role === 'admin' && req.body.secretKey) {
        dataObj.secretKey = req.body.secretKey;
    }

    try {

        if (dataObj.role === 'admin' && dataObj.secretKey !== process.env.ADMIN_KEY) {
            return res.status(201).json({ message: 'Incorrect Admin Key' });
        }
        const hashedPassword= await bcrypt.hash(dataObj.password,10);
        
        const existUser= await User.findOne({where:{
            email: dataObj.email
        }})
        if(existUser){
            console.log("signup exists");
        }
        else{
            console.log("signup donot exists");
        }
        
        
        const user= await User.create({
            name: dataObj.name,
            phone: dataObj.phone,
            email: dataObj.email,
            password: hashedPassword,
            role: dataObj.role
        })

        
        const token = jwt.sign({ id: user.id,
            email: user.email,
            name: user.name,
            role: user.role}, process.env.SECRET_KEY, {
            expiresIn: "1d",
          });
    
           const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true, 
            sameSite: "None",
            secure: true
            //redux
           };
       
         res.cookie("token", token, options);
         console.log(token);
         const role= user.role;
         res.status(200).json({
            message: "You have successfully logged in!",
            success: true,
            logged_in: true,
            token,
            user: {
                
                email: user.email,
                name: user.name,
                role: user.role,
              },
            role
          });
        }
        
     catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(201).json({ message: 'Email already exists' });
        }
        console.error("Error occurred:", error);
        res.status(500).json({ message: "An error occurred during signup" });
    
    }
    
};

module.exports = { signup };

