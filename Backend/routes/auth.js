const express = require('express');
const router = express.Router();
const {signUp, login, adminLogin, forgetPassword, resetPassword }  = require('../controllers/auth');

router.route('/signUp').post(signUp);
router.route('/login').post(login);
router.route('/adminLogin').post(adminLogin);
router.route('/forgetPassword').post(forgetPassword);
router.route('/resetPassword').post(resetPassword);

module.exports = router;