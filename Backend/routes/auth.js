const express = require('express');
const router = express.Router();
const {signUp, login, adminLogin }  = require('../controllers/auth');

router.route('/signUp').post(signUp);
router.route('/login').post(login);
router.route('/adminLogin').post(adminLogin);

module.exports = router;