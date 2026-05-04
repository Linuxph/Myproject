const { StatusCodes } = require("http-status-codes");
const Movies = require("../model/movie");
const Showtime = require("../model/showtime");
const fs = require('fs')
const path = require('path');
const {uploadImage,DeleteImage} = require('../utils/cloudinary');
const sizeOf = require('image-size');


const uploadAsAdmin = async (req, res, next) => {
  const { title, duration, description, release_date, rating,  genre} = req.body;
  
  try {
    const alreadyExists = await Movies.findOne({title:title});
    
    if(!alreadyExists){

      // Validate image dimensions
      const ImagePath = path.resolve(__dirname,`../uploads/${req.file.originalname}`);
      const dimensions = sizeOf(fs.readFileSync(ImagePath));
      
      // Normal poster size constraints: aspect ratio ~2:3 (width:height)
      // Minimum: 500x750, Maximum: 4000x6000
      const minWidth = 500;
      const minHeight = 750;
      const maxWidth = 4000;
      const maxHeight = 6000;
      const aspectRatio = dimensions.width / dimensions.height;
      const expectedAspectRatio = 2 / 3; 

      if (dimensions.width < minWidth || dimensions.height < minHeight) {
        fs.unlinkSync(ImagePath); 
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          msg: `Image too small. Minimum size is ${minWidth}x${minHeight} pixels.` 
        });
      }

      if (dimensions.width > maxWidth || dimensions.height > maxHeight) {
        fs.unlinkSync(ImagePath); // Delete the uploaded file
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          msg: `Image too large. Maximum size is ${maxWidth}x${maxHeight} pixels.` 
        });
      }

      // Check aspect ratio (allow 15% tolerance)
      if (Math.abs(aspectRatio - expectedAspectRatio) > 0.15) {
        fs.unlinkSync(ImagePath); // Delete the uploaded file
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          msg: `Invalid poster aspect ratio. Expected approximately 2:3 (e.g., 500x750, 1000x1500).` 
        });
      }

      const imageURL = await uploadImage(ImagePath,req.file.originalname);


      await Movies.create({
          title: title,
          Duration: duration,
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
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"movie not found"});
    }
    
    const showtime = await Showtime.findOne({movie: image._id});
    
    if(showtime){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please Delete the showtime first"});
    }
    
    const urlParts = image.ImageURL.split('/upload/');
    const pub_id = urlParts[1].replace(/\.[^/.]+$/, '').replace(/^v\d+\//, '');

    await DeleteImage(pub_id);
    
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
      startTime: new Date(`${date}T${startTime}`),
      endTime: new Date(`${date}T${endTime}`),
      price: Number(price),
      date: date,
    });
    res
      .status(StatusCodes.OK)
      .json({ msg: "The showtime has been created successfully" });

  } catch (error) {
    next(error);
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
    const data = await Showtime.deleteMany({ movie: id._id });
    res
      .status(StatusCodes.OK)
      .json({ data, msg: "The Showtime was successfully deleted" });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  uploadAsAdmin,
  deleteMovie,
  showtime,
  deleteShowtime,
};