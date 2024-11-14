const { StatusCodes } = require('http-status-codes');
const Seats = require('../model/seats');
const Showtime = require('../model/showtime');


const getSeatsDetails = async (req,res,next) => {
    try{  
      const {id: showtimeid }  = req.params;
      const seat = await Seats.find({showtimeId: showtimeid})
      
      res.status(StatusCodes.OK).json({seat});
      
    }catch(error){
      next(error);
    }
  }

  
  
const holdSeats = async (req, res) => {
  const { selectedSeats } = req.body;
  const showtimeId = req.params.id;

  try {
    // Mark the seats as temporarily held
    await Seat.updateMany(
      { _id: { $in: selectedSeats }, showtimeId, isAvailable: true },
      { $set: { isAvailable: false, holdUntil: Date.now() + 15 * 60 * 1000 } } // Hold for 15 minutes
    );
    res.status(200).json({ message: "Seats temporarily held." });
  } catch (error) {
    res.status(500).json({ message: "Error holding seats." });
  }
};


// const updateSeats = async (req,res,next) => {

//       const { id: showtimeId } = req.params;
//       const dataToBeUpdated = req.body;
      
//       try {
//         // Find all seats for the given showtime
//         const seats = await Seats.find({ showtimeId: showtimeId });
      
//         // Ensure seats were found
//         if (!seats || seats.length === 0) {
//           return res.status(404).json({ message: 'No seats found for this showtime' });
//         }
      
//         // Use Promise.all to handle multiple updates in parallel
//         const updatedSeats = await Promise.all(
//           dataToBeUpdated.map(async (seat) => {
//             return await Seats.findOneAndUpdate(
//               { showtimeId: showtimeId, column: seat.column },  // Find based on showtime and column
//               { isAvailable: false },  // Update isAvailable to false
//               { new: true }  // Return the updated document
//             );
//           })
//         );
      
//         res.status(StatusCodes.OK).json({ message: 'Seats updated successfully', updatedSeats });
//       } catch (error) {
//         next(error)
//       }

// }

const showtime = async (req, res, next) => {
    try {
      const { id: movieId } = req.params; 
      const showtimes = await Showtime.find({movie: movieId });

      if (!showtimes || showtimes.length === 0) {
        return res.status(404).json({ message: 'No showtimes found for the given movie' });
      }
      
      const seats = await Seats.find({showtimeId: showtimes._id });


      res.status(StatusCodes.OK).json({ showtimes,seats });
    } catch (error) {
      next(error);
    }
};


module.exports = {
    getSeatsDetails,
    showtime,
    holdSeats,
}