const { StatusCodes } = require("http-status-codes");
const Movies = require("../model/movie");
const Showtime = require("../model/showtime");
const fs = require('fs')
const path = require('path');
const {uploadImage} = require('../utils/cloudinary');



const uploadAsAdmin = async (req, res, next) => {
  const { title, duration, description, release_date, rating,  genre} = req.body;
  
  try {
    const alreadyExists = await Movies.findOne({title:title});
    
    if(!alreadyExists){

      // const imageURL = req.file.originalname;
      const ImagePath = path.resolve(__dirname,`../uploads/${req.file.originalname}`);
      const imageURL = await uploadImage(ImagePath,req.file.originalname); 


      await Movies.create({
          title: title,
          duration: duration,
          description: description,
          release_date: release_date,
          rating:rating,
          genre: genre,
          ImageURL: imageURL.secure_url
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
    const image = await Movies.findOne({ title: remove });
    
    if(!image){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"Something went wrong please try again later"});
    }
    
    const showtime = await Showtime.findOne({movie: image._id});
    
    if(showtime){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please Delete the showtime first"});
    }
    
    const path = `../uploads/${image.ImageURL.split('s/')[1]}`;
    
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
    
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
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Movie not found" });
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
      return res
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