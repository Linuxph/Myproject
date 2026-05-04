const express = require('express');
const router = express.Router();
const {signUp, login, adminLogin, forgetPassword, resetPassword, getMe }  = require('../controllers/auth');
const auth = require('../middleware/authentication');

router.route('/signUp').post(signUp);
router.route('/login').post(login);
router.route('/adminLogin').post(adminLogin);
router.route('/forgetPassword').post(forgetPassword);
router.route('/resetPassword').post(resetPassword);
router.route('/user/me').get(auth, getMe);

module.exports = router;