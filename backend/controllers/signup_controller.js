const User = require('../models/Users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');



const signup = async (req, res) => {
    console.log(req.body.email);
    const dataObj={
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    }
    try {
        const hashedPassword= await bcrypt.hash(dataObj.password,10);
        console.log(hashedPassword);
        const existUser= await User.findOne({where:{
            email: dataObj.email
        }})

        const user= await User.create({
            name: dataObj.name,
            phone: dataObj.phone,
            email: dataObj.email,
            password: hashedPassword
        })
        
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
          });
          user.token = token;
          user.password = undefined;
    
           const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true, 
           };
         
         res.cookie("token", token, options);
        
         res.status(200).json({
            message: "You have successfully logged in!",
            success: true,
            token,
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

