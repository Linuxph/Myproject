const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    row: { type: String, required: true },
    column: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
});

seatSchema.pre(/^find/, function (next) {
    this.sort({ row: 1, column:1 }); 
    next();
  });

module.exports = mongoose.model('Seats', seatSchema);

