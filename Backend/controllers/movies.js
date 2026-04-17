const { StatusCodes } = require("http-status-codes");
const Movies = require("../model/movie");
const Showtime = require("../model/showtime");
const Rated = require("../model/rating");
const redis = require('../utils/redis');

const CACHE_TTL = 60;

const getAllMovies = async (req, res) => {
  const cacheKey = `movies:all:${req.query.page || 1}:${req.query.limit || 10}`;
  
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return res.status(StatusCodes.OK).json(JSON.parse(cachedData));
  }
  
  let result = Movies.find({});
  
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  
  const movies = await result;
  
  const response = {movies, nbHits:movies.length};
  await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(response));
  
  res.status(StatusCodes.OK).json(response);
};

const showtime = async (req, res, next) => {
  try {
    const { id: movieId } = req.params; 
    const cacheKey = `showtimes:${movieId}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res.status(StatusCodes.OK).json(JSON.parse(cachedData));
    }

    const showtimes = await Showtime.find({movie: movieId });

    if (!showtimes || showtimes.length === 0) {
      return res.status(404).json({ message: 'No showtimes found for the given movie' });
    }
    
    const movieData = await Movies.find({_id: movieId });

    const response = { showtimes, movieData };
    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(response));

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
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
  const cacheKey = `movies:latest:${req.query.page || 1}:${req.query.limit || 12}`;
  
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return res.status(StatusCodes.OK).json(JSON.parse(cachedData));
  }
  
  let result = Movies.find({});
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const movies = await result.sort("release_date");
  
  const response = { movies, nbHits: movies.length };
  await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(response));
  
  res.status(StatusCodes.OK).json(response);
};

const ratedMovies = async (req, res) => {
  const cacheKey = `movies:rated:${req.query.page || 1}:${req.query.limit || 12}`;
  
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return res.status(StatusCodes.OK).json(JSON.parse(cachedData));
  }
  
  let result = Movies.find({});
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const movies = await result.sort({ rating: -1 });
  
  const response = { movies, nbHits: movies.length };
  await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(response));
  
  res.status(StatusCodes.OK).json(response);
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