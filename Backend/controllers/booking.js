const { StatusCodes } = require('http-status-codes');
const Seats = require('../model/seats');
const Showtime = require('../model/showtime');

const movie = require('../model/movie');
const User = require('../model/user');
const nodemailer = require('nodemailer');

const getSeatsDetails = async (req,res,next) => {
    try{  
      const { id: showtimeid } = req.params;

      const showtime = await Showtime.findOne({ _id: showtimeid });
      if (!showtime) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Showtime not found" });
      }

      const bookedSeatIds = showtime.bookedSeats.flatMap(booking => booking.seats);

      const availableSeats = await Seats.find({ 
        _id: { $nin: bookedSeatIds } 
      });

       const response = {availableSeats, showtime};
      
      res.status(StatusCodes.OK).json(response);
    }catch(error){
      next(error);
    }
  };

  const holdSeats = async (req, res, next) => {
    const { SelectedSeatIds } = req.body;
    const {showid:showtimeId, userid:userId} = req.params;

    try {
      const showtime = await Showtime.findOne({ _id: showtimeId });
      if (!showtime) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Showtime not found" });
      }

      const existingUserEntry = showtime.bookedSeats.find(entry => entry.user === userId);
      
      let updatedShowtime;
      if (existingUserEntry) {
        const combinedSeats = [...new Set([...existingUserEntry.seats, ...SelectedSeatIds])];
        updatedShowtime = await Showtime.findOneAndUpdate(
          { _id: showtimeId, "bookedSeats.user": userId },
          { $set: { "bookedSeats.$.seats": combinedSeats } },
          { new: true }
        );
      } else {
        updatedShowtime = await Showtime.findOneAndUpdate(
          { _id: showtimeId },
          { $push: { bookedSeats: { user: userId, seats: SelectedSeatIds } } },
          { new: true }
        );
      }

      res.status(StatusCodes.OK).json({ message: "Seats temporarily held.", updatedShowtime });
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
};

const bookedSeats = async (req, res, next) => {
  try {
    const {userid:userId,showid:showtimeId} = req.params;

    const showtime = await Showtime.findOne({_id:showtimeId});

    const Data = await Showtime.findOne({_id:showtimeId,"bookedSeats.user":userId});

    const seatInfo = Data.bookedSeats.find(seat => seat.user === userId);
    
    const seatsId = await Seats.find({_id: seatInfo.seats});
    
    const user = await User.findOne({_id:userId});
    
    const movieData = await movie.findOne({_id:showtime.movie});
    
    res.status(StatusCodes.OK).json({seatsId,user,movieData,showtime});
  }catch(error){
    next(error);
  }
};


module.exports = {
    getSeatsDetails,
    holdSeats,
    bookedSeats,
    email
}