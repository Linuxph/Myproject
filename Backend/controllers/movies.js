const { StatusCodes } = require("http-status-codes");
const Movies = require("../model/movie");
const Showtime = require("../model/showtime");
const Rated = require("../model/rating");

const getAllMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const movies = await Movies.find({}).sort({ _id: -1 }).skip(skip).limit(limit);
    
    res.status(StatusCodes.OK).json({ movies, nbHits: movies.length });
  } catch (error) {
    console.error('Database error in getAllMovies:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const showtime = async (req, res, next) => {
  try {
    const { id: movieId } = req.params; 

    const showtimes = await Showtime.find({movie: movieId });

    if (!showtimes || showtimes.length === 0) {
      return res.status(404).json({ message: 'No showtimes found for the given movie' });
    }
    
    const movieData = await Movies.find({_id: movieId });

    const response = { showtimes, movieData };
    
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error('Error in showtime:', error.message);
    next(error);
  }
};


const postRating = async (req, res) => {
  const userId = req.user._id;
  const rating = Rated.create({ ...req.body }, userId);
  res.status(StatusCodes.CREATED).json({ rating });
};

const getRating = async (req, res, next) => {
  try {
    const { movieId, userId } = req.params;
    const rating = await Rated.findOne({ userId: userId, movieId: movieId });
    if (!rating) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Rating not found" });
    }
    res.status(StatusCodes.OK).json({ rating });
  } catch (error) {
    next(error);
  }
};

const WatchListMovies = async (req, res) => {
  res.send("ok");
};

const favMovies = async (req, res) => {
  res.send("ok");
};

const latestMovies = async (req, res) => {
  try {
    let result = Movies.find({});
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const movies = await result.sort({ release_date: -1 });
    
    const response = { movies, nbHits: movies.length };
    
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error('Database error in latestMovies:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const ratedMovies = async (req, res) => {
  try {
    let result = Movies.find({});
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    const movies = await result.sort({ rating: -1 }).exec();
    
    const response = { movies, nbHits: movies.length };
    
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error('Database error in ratedMovies:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllMovies,
  showtime,
  favMovies,
  WatchListMovies,
  latestMovies,
  ratedMovies,
  postRating,
  getRating,
};