const express= require('express');
const { login }=require('../controllers/login_controller');
const { signup } = require('../controllers/signup_controller');
const { logged } = require('../controllers/logged_controller');
const { admin } = require('../controllers/admin_controller');
const { update_admin } = require('../controllers/update_admin_controller');
const { fetch_admin } = require('../controllers/fetch_admin_controller');
const { delete_admin } = require('../controllers/delete_admin_controller');
const { logout } = require('../controllers/logout_controller');
const { compile } = require('../controllers/compiler_controller');
const { uploadTestCase } = require('../controllers/uploadTestCase_controller');
const { getTestcases } = require('../controllers/getTestcases_controller');


const router= express.Router();

router.post('/login',login);
router.post('/signup',signup);
router.post('/logged',logged);
router.post('/admin',admin);
router.patch('/update_admin',update_admin);
router.get('/fetch_admin/:questionId',fetch_admin);
router.get('/fetch_admin',fetch_admin);
router.delete('/delete_admin/:_id', delete_admin);
router.get('/logout',logout);
router.post('/compile',compile);
router.post('/uploadTestCase',uploadTestCase);
router.get('/getTestcases', getTestcases);

module.exports = router;