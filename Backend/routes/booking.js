const express = require('express');
const router = express.Router();
const {getSeatsDetails, holdSeats, bookedSeats, email} = require('../controllers/booking');

router.route('/booking/seats/:id').get(getSeatsDetails)
router.route('/booking/seats/:showid/:userid').post(holdSeats);
router.route('/booking/:userid/:showid').get(bookedSeats);
router.route('/booking').post(email);

module.exports = router;