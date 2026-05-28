const { StatusCodes } = require("http-status-codes");
const Movies = require("../model/movie");
const Showtime = require("../model/showtime");
const fs = require('fs')
const path = require('path');
const {uploadImage,DeleteImage} = require('../utils/cloudinary');
const { imageSize: sizeOf } = require('image-size');


const uploadAsAdmin = async (req, res, next) => {
  const { title, duration, description, release_date, rating, genre } = req.body;
  const ImagePath = req.file ? path.resolve(__dirname, `../uploads/${req.file.originalname}`) : null;
  
  try {
    const alreadyExists = await Movies.findOne({ title: title });
    
    if (!alreadyExists) {
      if (!ImagePath || !fs.existsSync(ImagePath)) {
         return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Image is required" });
      }

      // Validate image dimensions
      const dimensions = sizeOf(fs.readFileSync(ImagePath));
      
      // Normal poster size constraints: aspect ratio ~3:2 (width:height)
      // Minimum: 300x200, Maximum: 4500x3000
      const minWidth = 300;
      const minHeight = 200;
      const maxWidth = 4500;
      const maxHeight = 3000;
      const aspectRatio = dimensions.width / dimensions.height;
      const expectedAspectRatio = 3 / 2; 

      if (dimensions.width < minWidth || dimensions.height < minHeight) {
        if (fs.existsSync(ImagePath)) fs.unlinkSync(ImagePath); 
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          msg: `Image too small. Minimum size is ${minWidth}x${minHeight} pixels.` 
        });
      }

      if (dimensions.width > maxWidth || dimensions.height > maxHeight) {
        if (fs.existsSync(ImagePath)) fs.unlinkSync(ImagePath); // Delete the uploaded file
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          msg: `Image too large. Maximum size is ${maxWidth}x${maxHeight} pixels.` 
        });
      }

      // Check aspect ratio (allow 15% tolerance)
      if (Math.abs(aspectRatio - expectedAspectRatio) > 0.15) {
        if (fs.existsSync(ImagePath)) fs.unlinkSync(ImagePath); // Delete the uploaded file
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          msg: `Invalid poster aspect ratio. Expected approximately 3:2 (e.g., 3000x2000).` 
        });
      }

      const imageURL = await uploadImage(ImagePath, req.file.originalname);

      await Movies.create({
          title: title,
          Duration: duration,
          description: description,
          release_date: release_date,
          rating: rating,
          genre: genre,
          ImageURL: imageURL.secure_url
      });
  
      res.status(StatusCodes.OK).json({ msg: "The movie has been added successfully" });
    } else {
      if (ImagePath && fs.existsSync(ImagePath)) {
        fs.unlinkSync(ImagePath);
      }
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "The movie already exists" }); 
    }
  } catch (error) {
    if (ImagePath && fs.existsSync(ImagePath)) {
      fs.unlinkSync(ImagePath);
    }
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