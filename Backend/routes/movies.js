const express = require('express');
const router = express.Router();
const {getAllMovies,getMovie, latestMovies, ratedMovies, postRating, getRating} = require('../controllers/movies');

router.route('/home').get(getAllMovies);
router.route('/rating/:userId/:movieId').get(getRating);
router.route('/rating').post(postRating);
router.route('/latest').get(latestMovies);
router.route('/rated').get(ratedMovies);

module.exports = router;