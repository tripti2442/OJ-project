const User = require('../models/Users.js');

const login = async (req, res) => {
    console.log(req.body.email);
    const dataObj={
        email: req.body.email,
        password: req.body.password
    }
    try {
        
    } catch (error) {
        console.error("error occured : ",error);
    }
    
};

module.exports = { login };

