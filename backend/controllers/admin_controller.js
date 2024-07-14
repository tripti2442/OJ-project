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


const admin = async (req, res) => {
    try {
       
        const { admin_name, status, error } = await verifyAdminToken(req);
        if (error) {
            return res.status(status).json({error: error});
        }
       
        const data = req.body;
        const createProblem = await Problem.create({
            admin_name,
            statement: data.statement,
            name: data.name,
            difficulty: data.difficulty,
            topic: data.topic
        })
        if (createProblem) {
            console.log("problem created");
        }

    } catch (error) {
        console.error('error:', error);
       
    }
};

module.exports = { admin };


/*
const Problem = require('../models/Problems.js');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');


const admin = async (req, res) => {
    try {

        console.log("reached admin add");
        const data = req.body;
        const createProblem = await Problem.create({
            admin_name:"hefi",
            statement: data.statement,
            name: data.name,
            code: data.code,
            difficulty: data.difficulty,
            topic: data.topic
        })
        if (createProblem) {
            console.log("problem created");
        }


    } catch (error) {
        console.error('error:', error);

    }
};

module.exports = { admin }; 
*/







/*
const Problem = require('../models/Problems.js');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');

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

        if (role === 'admin') {
            return { admin_name: decodedToken.email, status: 200 };
        }

        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return { error: 'Unauthorized', status: 401 };
    }
};


const admin = async (req, res) => {
    try {

        const { admin_name, status, error } = await verifyAdminToken(req);
        if (error) {
            return res.status(status).json({ error: error });
        }
        const data = req.body;
        const createProblem = await Problem.create({
            admin_name,
            statement: data.statement,
            name: data.name,
            code: data.code,
            difficulty: data.difficulty,
            topic: data.topic
        })
        if (createProblem) {
            console.log("problem created");
        }


    } catch (error) {
        console.error('error:', error);

    }
};

module.exports = { admin }; */







