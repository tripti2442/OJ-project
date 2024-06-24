const express= require('express');
const { login }=require('../controllers/login_controller');
const { signup } = require('../controllers/signup_controller');

const router= express.Router();

router.post('/login',login);
router.post('/signup',signup);


module.exports = router;