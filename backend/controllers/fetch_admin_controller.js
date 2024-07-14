const Problem= require('../models/Problems.js');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');

const verifyAdminToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return { error: 'Unauthorized: no token provided', status: 401 };
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        return { user_name: decodedToken.email, status: 200 };


        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return { error: 'Unauthorized', status: 401 };
    }
};

const fetch_admin = async (req, res) => {
   
    try {
        const { user_name, status, error } = await verifyAdminToken(req);
        if (error) {
            return res.status(status).json({ error: error });
        }
        
        let problems;
        const { questionId } = req.params;

        if (questionId) {
            const problem = await Problem.findById(questionId);
            if (!problem) {
                return res.status(404).json({ error: 'Problem not found' });
            }
            problems = [problem]; 
           
        } else {
    
          
            problems = await Problem.find({});
        }
        res.status(200).json({ problems });

    } catch (error) {
        console.error('Error fetching problems:', error);
        res.status(500).json({ error: 'Error fetching problems' });
    }
};


/*const fetch_admin = async (req, res) => {
    try {
        
        const problems = await Problem.find({});
        
        res.status(200).json({ problems });

    } catch (error) {
        console.error('Error fetching problems:', error);
        res.status(500).json({ error: 'Error fetching problems' });
    }
};*/


module.exports = {fetch_admin};










