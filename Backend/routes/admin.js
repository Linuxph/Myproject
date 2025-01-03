const express = require('express');
const router = express.Router();
const {uploadAsAdmin, deleteMovie, showtime, deleteShowtime} = require('../controllers/admin');


router.route('/add').post(uploadAsAdmin);
router.route('/remove').delete(deleteMovie);
router.route('/showtime').post(showtime);
router.route('/deleteShowtime').delete(deleteShowtime);

module.exports = router;