const Testcase = require('../models/Testcases.js');
const jwt = require('jsonwebtoken');

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

const getTestcases = async (req, res) => {
    const { questionId } = req.query;
    console.log("testcase id " + questionId);
    
    try {
        const { user_name, status, error } = await verifyAdminToken(req);
        if (error) {
            return res.status(status).json({ error: error });
        }
        let testcases;
        
        if (questionId) {
            testcases = await Testcase.find({ problem_id: questionId }); 
            if (!testcases || testcases.length === 0) {
                return res.status(404).json({ error: 'Testcases not found' });
            }
        } else {
            return res.status(400).json({ error: 'Missing questionId in request body' });
        }
        
        console.log({ testcases });
        res.status(200).json({ testcases });

    } catch (error) {
        console.error('Error fetching test cases:', error);
        res.status(500).json({ error: 'Error fetching test cases' });
    }
};

module.exports = { getTestcases };
