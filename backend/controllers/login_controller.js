const User = require('../models/Users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    console.log("login here");
    const dataObj = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };

    if (req.body.role === 'admin' && req.body.secretKey) {
        dataObj.secretKey = req.body.secretKey;
    }
    try {
     
        if (dataObj.role === 'admin' && dataObj.secretKey !== process.env.ADMIN_KEY) {
            return res.status(401).json({ message: 'Incorrect Admin Key' });
        }

        const existUser = await User.findOne({ email: dataObj.email });

        if (!existUser) {
            console.log("User not found for email:", dataObj.email);
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(
            dataObj.password,
            existUser.password 
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Incorrect Password' });
        }

        const token = jwt.sign({
            id: existUser._id,
            email: existUser.email,
            name: existUser.name,
            role: existUser.role
        }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        // Setting cookie options
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "None",
            secure: true
        };

        // Sending response

        const role=existUser.role;
        res.cookie("token", token, options);
        console.log(token);
        res.status(200).json({
            message: "You have successfully logged in!",
            success: true,
            logged_in: true,
            token,
            user: {
                email: existUser.email,
                name: existUser.name,
                role: existUser.role,
            },
            role
        });

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { login };


/*const User = require('../models/Users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const dataObj = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };

    if (req.body.role === 'admin' && req.body.secretKey) {
        dataObj.secretKey = req.body.secretKey;
    }
    try {
        if (dataObj.role === 'admin' && dataObj.secretKey !== process.env.ADMIN_KEY) {
            return res.status(401).json({ message: 'Incorrect Admin Key' });
        }

        // Finding the user by email
        const existUser = await User.find({
            where: {
                email: dataObj.email
            }
        });

        if(existUser){
            console.log("existUser"+existUser);
        }
        else{
            console.log("no");
            
        }
        // Check if user exists
       /* if (!existUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verifying password
        const isPasswordCorrect = await bcrypt.compare(
            dataObj.password,   
            existUser.password // Make sure 'hashedPassword' matches your DB field
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Incorrect Password' });
        }

        // Generating token
        const token = jwt.sign({ 
            id: existUser.id,
            email: existUser.email,
            name: existUser.name,
            role: existUser.role
        }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        // Setting cookie options
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "None",
            secure: true
        };

        // Sending response
        res.cookie("token", token, options);
        res.status(200).json({
            message: "You have successfully logged in!",
            success: true,
            logged_in: true,
            token,
            user: {
                email: existUser.email,
                name: existUser.name,
                role: existUser.role,
            }
        });

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { login };




*/






/*const User = require('../models/Users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const dataObj={
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }

    if (req.body.role === 'admin' && req.body.secretKey) {
        dataObj.secretKey = req.body.secretKey;
    }
    try {
        if (dataObj.role === 'admin' && dataObj.secretKey !== process.env.ADMIN_KEY) {
            return res.status(201).json({ message: 'Incorrect Admin Key' });
        }
        const users= await User.find({});
        console.log(users);
        console.log("email id of users "+users[0].email);
        console.log("email entered "+dataObj.email);
        const existUser= await User.findOne({where:{
            email: dataObj.email
        }})
        if(existUser){
            console.log("yes");
        }
        else{
            console.log("no");
            
        }
        

        
        console.log("dataObj.password "+dataObj.password);
        console.log("existUser.password "+existUser.hashedPassword);
        const isPasswordCorrect = await bcrypt.compare(
            dataObj.password,   
            existUser.password
        );
       
        if(!isPasswordCorrect){
            return res.status(201).json({ message: 'Incorrect Password' });
        }

        const token = jwt.sign({ id: existUser.id,
            email: existUser.email,
            name: existUser.name,
            role: existUser.role}, process.env.SECRET_KEY, {
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
         res.status(200).json({
            message: "You have successfully logged in!",
            success: true,
            logged_in: true,
            token,
            user: {
                
                email: existUser.email,
                name: existUser.name,
                role: existUser.role,
              }
          });
        



    } catch (error) {
        console.error("error occured : ",error);
    }
    
};

module.exports = { login };*/

