const express = require('express');
const router = express.Router();
const {signUp, login, adminLogin, logout }  = require('../controllers/auth');

router.route('/signUp').post(signUp);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/adminLogin').get(adminLogin);

module.exports = router;