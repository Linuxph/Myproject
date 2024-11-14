const mongo = require('mongoose');

    const movieSchema = mongo.Schema({
        title:String,
        description:String,
        rating:Number,
        release_date:Date,
        ImageURL:String,
        Duration: Number,
        genre:{
            type:String,
        },
        userRating:{
            type:String,
            rating:Number,
        }
    })
    
    const movie = mongo.model("Movies",movieSchema);
    
module.exports = movie;    
    
