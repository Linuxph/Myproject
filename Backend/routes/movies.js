const express = require('express');
const router = express.Router();
const {getAllMovies, showtime, latestMovies, ratedMovies, postRating, getRating} = require('../controllers/movies');

router.route('/home').get(getAllMovies);
router.route('/movie/:id').get(showtime);
router.route('/latest').get(latestMovies);
router.route('/rated').get(ratedMovies);
router.route('/rating/:userId/:movieId').get(getRating);
router.route('/rating').post(postRating);

module.exports = router;