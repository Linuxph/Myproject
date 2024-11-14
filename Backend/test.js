const mongoose = require('mongoose');
const Seats = require('./model/seats');


const mongoURI = 'mongodb://localhost:27017/Movie-booking-app';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

    const createSeatsForShowtime = async (showtimeId = "66bcc2fef31cc6db9edc3f45") => {
        const seatData = [];
    
        const rows = ['F','G','H','I','J'];  //'F','G','H','I','J'
        const columnsPerRow = 15; 
    
        for (let row of rows) {
            for (let col = 1; col <= columnsPerRow; col++) {
                seatData.push({
                    row: row,
                    column: col,
                    isAvailable: true,
                    showtimeId: showtimeId
                });
            }
        }
    
        try {
            await Seats.insertMany(seatData);
            console.log(`Seats created for showtime ${showtimeId}`);
        } catch (err) {
            console.error("Error creating seats:", err);
        }
    };
    
    createSeatsForShowtime();
    