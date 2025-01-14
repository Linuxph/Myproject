const { StatusCodes } = require("http-status-codes");
const Movies = require("../model/movie");
const Rated = require("../model/rating");


const getAllMovies = async (req, res) => {
  
    const {user} = req;
    let result = Movies.find({});
  
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
  
    const movies = await result;
    
    res.status(StatusCodes.OK).json({movies, nbHits:movies.length, user})
  
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
  let result = Movies.find({});
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const movies = await result.sort("release_date");
  res.status(StatusCodes.OK).json({ movies, nbHits: movies.length });
};
const ratedMovies = async (req, res) => {
  let result = Movies.find({});
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const movies = await result.sort({ rating: -1 });
  res.status(StatusCodes.OK).json({ movies, nbHits: movies.length });
};
module.exports = {
  getAllMovies,
  favMovies,
  WatchListMovies,
  latestMovies,
  ratedMovies,
  postRating,
  getRating,
};