const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    email:{
      type:String,
        required:[true,'Email is required.'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique: true,
    },
})



adminSchema.methods.createJWT = function () {
    return jwt.sign(    
      { adminId: this._id, email: this.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    )
}


module.exports = mongoose.model("Admin",adminSchema);