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

const delete_admin = async (req, res) => {
    try {
        const { admin_name, status, error } = await verifyAdminToken(req);
        if (error) {
            return res.status(status).json({ error: error });
        }
        const { _id } = req.params;
        const deletedProblem = await Problem.findByIdAndDelete(_id);

        if (!deletedProblem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        return res.status(200).json({ message: 'Problem deleted successfully' });
    } catch (error) {
        console.error('Error deleting problem:', error);
        return res.status(500).json({ error: 'Error deleting problem' });
    }
};


/*const delete_admin = async (req, res) => {
    try {
        const { _id } = req.params;
        const deletedProblem = await Problem.findByIdAndDelete(_id);

        if (!deletedProblem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        
       return res.send(200).json({ message: 'Problem deleted' });

    } catch (error) {
        console.error('Error deleting problem:', error);
        res.status(500).json({ error: 'Error deleting problems' });
    }
};
*/

module.exports = {delete_admin};










