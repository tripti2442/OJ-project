/*const Problem = require('../models/Problems.js');
const jwt = require('jsonwebtoken');

const verifyAdminToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: no token provided' });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        const { role } = decodedToken;
        if (role !== 'admin') {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        
        req.admin_email = decodedToken.email;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

const update_admin = async (req, res) => {
    console.log("handleupdate backend");
    try {
        const { admin_email } = req; 
        const { _id, title, type, body } = req.body;

       
        const existingProblem = await Problem.findById(_id);

        if (!existingProblem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        // Update the problem
        existingProblem.set({
            title: title || existingProblem.title,
            type: type || existingProblem.type,
            body: body || existingProblem.body
            
        });

        await existingProblem.save();

        console.log("Problem updated:", existingProblem);
        res.status(200).json({ message: 'Problem updated successfully', updatedProblem: existingProblem });

    } catch (error) {
        console.error('Error updating problem:', error);
        res.status(500).json({ error: 'Error updating problem' });
    }
};

module.exports = { update_admin };
*/



const Problem = require('../models/Problems.js');
const jwt = require('jsonwebtoken');

const verifyAdminToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: no token provided' });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        const { role } = decodedToken;
        if (role !== 'admin') {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        
        req.admin_email = decodedToken.email;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

const update_admin = async (req, res) => {
    console.log("handleupdate backend");
    try {
        const { admin_email } = req; 
        const { _id, statement, name, code, difficulty, topic } = req.body;
     
        
       
        const existingProblem = await Problem.findById(_id);

        if (!existingProblem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        // Update the problem
        existingProblem.set({
            
            statement: statement || existingProblem.statement, 
            name: name || existingProblem.name,
            difficulty: difficulty || existingProblem.difficulty, 
            topic: topic || existingProblem.topic
            
        });

        await existingProblem.save();

        console.log("Problem updated:", existingProblem);
        res.status(200).json({ message: 'Problem updated successfully', updatedProblem: existingProblem });

    } catch (error) {
        console.error('Error updating problem:', error);
        res.status(500).json({ error: 'Error updating problem' });
    }
};

module.exports = { update_admin };




/*const Problem = require('../models/Problems.js');
const jwt = require('jsonwebtoken');

const verifyAdminToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: no token provided' });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        const { role } = decodedToken;
        if (role !== 'admin') {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Attach admin email to request for use in subsequent handlers
        req.admin_email = decodedToken.email;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

const update_admin = async (req, res) => {
    console.log("handleupdate backend");
    try {
        const { admin_email } = req; // admin_email from verifyAdminToken middleware
        const { _id, title, type, body } = req.body;

        // Check if problem exists
        console.log(_id);
        const existingProblem = await Problem.findById({
            _id 
        });
       
        if (!existingProblem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        // Update the problem
        existingProblem.set({
            title: title || existingProblem.title,
            type: type || existingProblem.type,
            body: body || existingProblem.body
          
        });
       
        await existingProblem.save();

        console.log("Problem updated:", updatedProblem);
        res.status(200).json({ message: 'Problem updated successfully' });

    } catch (error) {
        console.error('Error updating problem:', error);
        res.status(500).json({ error: 'Error updating problem' });
    }
};

module.exports = { update_admin };




*/







/*const Problem= require('../models/Problems.js');
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
            return { admin_email: decodedToken.email , status: 200};
        }

        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return { error: 'Unauthorized', status: 401 };
    }
};


const update_admin = async (req, res) => {
    try {
       
        const { admin_email, status, error } = await verifyAdminToken(req);
        if (error) {
            return res.status(status).json({error: error});
        }
        const data= req.body;
        const existProblem= await Problem.findOne({
            where:{id: data.id}
        })
        const existProblem= await Problem.update({
            admin_name,
            title: data.title,
            type: data.type,
            body: data.body
        })
        if(createProblem){
            console.log("problem created");
        }
        
        
    } catch (error) {
        console.error('error:', error);
       
    }
};

module.exports = { update_admin };



*/






