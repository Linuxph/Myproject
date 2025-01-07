const { StatusCodes } = require('http-status-codes');
const Seats = require('../model/seats');
const Showtime = require('../model/showtime');

const movie = require('../model/movie');
const User = require('../model/user');
const nodemailer = require('nodemailer');

const getSeatsDetails = async (req,res,next) => {
    try{  
      const { id: showtimeid } = req.params;

      // Fetch all seats
      const allSeats = await Seats.find(); 

      // Fetch the specific showtime
      const showtime = await Showtime.findOne({ _id: showtimeid });

      // Extract all booked seat IDs
      const bookedSeatIds = showtime.bookedSeats.flatMap(booking => booking.seats);

      
      // Filter available seats
      const availableSeats = allSeats.filter(seat => !bookedSeatIds.includes(seat._id.toString()));

      res.status(StatusCodes.OK).json({availableSeats});

      
    }catch(error){
      next(error);
    }
  }

  
  
const holdSeats = async (req, res, next) => {
  const { SelectedSeatIds } = req.body;
  const {showid:showtimeId,userid:userId} = req.params;
  
  try {

    const updatedShowtime = await Showtime.updateOne(
      {
        _id: showtimeId,
        "bookedSeats.user": userId // Check if the user already exists in bookedSeats
      },
      {
        $addToSet: { "bookedSeats.$.seats": { $each: SelectedSeatIds } } // Add new seats, avoiding duplicates
      }
    );
    
    // If no entry exists for the user, create one
    const newshowtime = await Showtime.updateOne(
      {
        _id: showtimeId,
        "bookedSeats.user": { $ne: userId } // Check if the user does NOT exist
      },
      {
        $push: { bookedSeats: { user: userId, seats: SelectedSeatIds } } // Add a new entry for the user
      }
    );

    res.status(StatusCodes.OK).json({ message: "Seats temporarily held.", updatedShowtime, newshowtime });
  } catch (error) {
    next(error)
  }
};


const email = async (req,res,next) => {
  const {user,data1} = req.body;
  
  try {
    var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'manassinghgenai@gmail.com',
            pass: process.env.App_Password,
          }
        });
        
        var mailOptions = {
          from: 'Team MOVIEtIME',
          to: `${user.email}`,
          subject: 'ENJOY YOUR TIME WITH THIS MOVIE',
          text: `This is the confirmation mail let you know that your tickets ${data1.length} for the showtime has been confirmed. `
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            res.status(StatusCodes.BAD_REQUEST).json({msg:"Something went wrong"});
          } else {
            res.status(StatusCodes.BAD_REQUEST).json({msg:`Email sent: ${info.response}`});
          }
        }); 
      } catch (error) {
        next(error)
      }

}

const showtime = async (req, res, next) => {
    try {
      const { id: movieId } = req.params; 
      const showtimes = await Showtime.find({movie: movieId });

      if (!showtimes || showtimes.length === 0) {
        return res.status(404).json({ message: 'No showtimes found for the given movie' });
      }
      
      const movieData = await movie.find({_id: movieId });


      res.status(StatusCodes.OK).json({ showtimes,movieData });
    } catch (error) {
      next(error);
    }
};


const bookedSeats = async (req, res, next) => {
  try {
    const {userid:userId,showid:showtimeId} = req.params;

    const Data = await Showtime.findOne({_id:showtimeId,"bookedSeats.user":userId});

    const seatInfo = Data.bookedSeats.find(seat => seat.user === userId);
    
    const seatsId = await Seats.find({_id: seatInfo.seats});
    
    const user = await User.findOne({_id:userId});

    res.status(StatusCodes.OK).json({seatsId,user,Data});
  }catch(error){
    next(error);
  }
}

module.exports = {
    getSeatsDetails,
    showtime,
    holdSeats,
    bookedSeats,
    email
}