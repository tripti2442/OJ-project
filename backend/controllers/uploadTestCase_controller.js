const Problem = require('../models/Problems.js');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');
const Testcase = require('../models/Testcases.js');

const verifyAdminToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return { error: 'Unauthorized: no token provided', status: 401 };
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        const { role } = decodedToken;
        if (role !== 'admin') {
            return { error: 'Unauthorized', status: 401 };
        }

        if(role === 'admin'){
            return { admin_name: decodedToken.email , status: 200};
        }

        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return { error: 'Unauthorized', status: 401 };
    }
};


const uploadTestCase = async (req, res) => {
    try {
        const { admin_name, status, error } = await verifyAdminToken(req);
        if (error) {
            return res.status(status).json({error: error});
        }

        console.log("reached testcase add");
        const data = req.body;
        console.log(data._id);
        console.log(data.input);
        console.log(data.expectedOutput);
        const createTestcase = await Testcase.create({
            admin_name:admin_name,
            problem_id: data._id,
            input: data.input,
            expectedOutput: data.expectedOutput
        })
        if (createTestcase) {
            console.log("Testcase created");
        }


    } catch (error) {
        console.error('error:', error);

    }
};

module.exports = { uploadTestCase }; 


