const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');

const logged = async (req, res) => {
    try {
       
        const token = req.body.token; 
        
        if (!token) {
            return res.status(200).json({ message: 'Token not provided' });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const { role } = decodedToken;

     
        const user = await User.findOne({ email: decodedToken.email });

        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }

        if (role === 'admin') {
            return res.status(200).json({ message: 'admin'});
        } else if (role === 'user') {
            return res.status(200).json({ message: 'user' });
        } else {
            return res.status(200).json({ message: 'Unauthorized role' });
        }
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(200).json({ message: 'Unauthorized' });
    }
};

module.exports = { logged };











/*const User = require('../models/Users.js');

const logged = async (req, res) => {
    console.log(req.body);
    const token = req.body;
    const decodedToken='';
    try {
        decodedToken = jwt.verify(token, process.env.SECRET_KEY );
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(201).json({ message: 'Unauthorized' });
    }

    const {  role } = decodedToken;
    
    if(role==='admin'){
        return res.status(201).json({ message: 'admin' });
    }
    if(role==='user'){
        return res.status(201).json({ message: 'user' });
    }
   

};

module.exports = { logged };*/

