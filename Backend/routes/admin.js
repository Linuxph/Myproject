const express = require('express');
const router = express.Router();
const {uploadAsAdmin, deleteMovie, showtime, deleteShowtime} = require('../controllers/admin');
const auth = require('../middleware/authentication');

router.route('/add').post(auth, uploadAsAdmin);
router.route('/remove').delete(auth, deleteMovie);
router.route('/showtime').post(auth, showtime);
router.route('/deleteShowtime').delete(auth, deleteShowtime);

module.exports = router;