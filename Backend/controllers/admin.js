const { StatusCodes } = require("http-status-codes");
const Movies = require("../model/movie");
const Showtime = require("../model/showtime");

const uploadAsAdmin = async (req, res, next) => {

  const { title, duration, description, release_date, rating,  genre, ImageURL} = req.body;

  try {

    const alreadyExists = await Movies.findOne({title:title});

    
    if(!alreadyExists){
      await Movies.create({
          title: title,
          duration: duration,
          description: description,
          release_date: release_date,
          rating:rating,
          genre: genre,
          ImageURL: ImageURL
      });
  
  
      res
        .status(StatusCodes.OK)
        .json({ msg: "The movie has been added successfully" });
      }
      else{
        res.status(StatusCodes.BAD_REQUEST).json({msg:"The movie already exists"}); 
      }
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { remove } = req.body;
    const data = await Movies.deleteOne({ title: remove });

    res
      .status(StatusCodes.OK)
      .json({ data, msg: "Successfully removed the movie" });
  } catch (error) {
    next(error);
  }
};

const showtime = async (req, res, next) => {
  try {
    const { movieId, startTime, endTime, price, date } = req.body;

    const movieid = await Movies.findOne({ title: movieId });

    if (!movieid) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "Movie not found" });
    }

    // try{

    //     const countShowtime = await Showtime.find({
    //         movie: movieId._id,
    //         date: date,
    //     })

    //     console.log(countShowtime);

    //     if(countShowtime.length < 3){

    //         await Showtime.create({
    //             movie: movieid._id,
    //             startTime: Date(startTime),
    //             endTime: Date(endTime),
    //             price: price,
    //             date: date
    //         });
    //     }
    // }catch(error){
    //     console.log(error);
    // }

    await Showtime.create({
      movie: movieid._id,
      startTime: Date(startTime),
      endTime: Date(endTime),
      price: price,
      date: date,
    });
    res
      .status(StatusCodes.OK)
      .json({ msg: "The showtime has been created successfully" });
  } catch (error) {
    next();
  }
};

const deleteShowtime = async (req, res, next) => {
  try {
    const { showremove } = req.body;

    const id = await Movies.findOne({ title: showremove });

    if (!id) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "The movie is already deleted" });
    }

    data = await Showtime.deleteOne({ movie: id._id });

    res
      .status(StatusCodes.OK)
      .json({ data, msg: "The Showtime was successfully deleted" });
  } catch (error) {
    next();
  }
};

module.exports = {
  uploadAsAdmin,
  deleteMovie,
  showtime,
  deleteShowtime,
};
