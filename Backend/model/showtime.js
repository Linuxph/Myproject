const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref:'Movie', required: true  },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    price: { type: Number, required: true },
    date:String,
    bookedSeats: [{user:String,seats:Array}]
});

module.exports = mongoose.model('Showtimes', showtimeSchema);