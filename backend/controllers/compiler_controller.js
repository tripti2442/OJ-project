const Problem = require('../models/Problems.js');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');
const {generateFile} = require('../compiler/generateFile.js');
const {generateInputFile} = require('../compiler/generateInputFile.js');
const {executeCpp} = require('../compiler/executeCpp.js');

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

const compile = async (req, res) => {
    try {

        const { user_name, status, error } = await verifyAdminToken(req);
        if (error) {
            return res.status(status).json({ error: error });
        }
        const { language = 'cpp', code, input } = req.body;
        if (code === undefined) {
            return res.status(404).json({ success: false, error: "Empty code!" });
        }
        
        const filePath = await generateFile(language, code);
        console.log(filePath);
        const inputPath = await generateInputFile(input);
        console.log(inputPath);
        const output = await executeCpp(filePath, inputPath);
        console.log(output);
        res.status(201).json({ output });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

module.exports = { compile };







