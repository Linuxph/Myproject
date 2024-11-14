const express = require('express');
const router = express.Router();
const {getSeatsDetails, showtime, holdSeats} = require('../controllers/booking');


router.route('/booking/showtime/:id').get(showtime).post(holdSeats);
router.route('/booking/seats/:id').get(getSeatsDetails);

module.exports = router;