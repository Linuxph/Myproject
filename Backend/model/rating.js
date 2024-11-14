const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movie',
        required:true,
    },
    ratingValue:Number
})


module.exports = mongoose.model("Ratings",ratingSchema);