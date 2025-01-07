const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    row: { type: String, required: true },
    column: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model('Seats', seatSchema);

