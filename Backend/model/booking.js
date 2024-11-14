const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user_id: {
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true]
    },
    showtime_id:{
        type:mongoose.Types.ObjectId,
        ref:'Showtime',
        required:true,
    },
    seats:{
        type:[mongoose.Types.ObjectId],
        ref:'Seat',
        required:true,
    },
    booking_time: new Date(),
    total_amount: Number
})

module.exports = mongoose.model("Bookings",bookingSchema);
// id (primary key)
// user_id (foreign key to User)
// showtime_id (foreign key to Showtime)
// seat_ids (array of seat ids)
// booking_time
// total_amount