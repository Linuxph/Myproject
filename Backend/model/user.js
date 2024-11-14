const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name cannot be empty'],
        maxlength:[50,'Name cannot be more than 50 letters.']
    },
    email:{
        type:String,
        required:[true,'Email is required.'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique: true,
    },
    phone_no:{
        type:Number,
        required: [true,'Phone number is neccessay.'],
        minlength:[10,'Please enter the valid phone number']
    },
  
    password:{
        type:String,
        required:[true,'Password cannot be empty.'],
    }
})

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function () {
    return jwt.sign(    
      { userId: this._id, name: this.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    )
}

userSchema.methods.passwordCompare = async function  (candidatePassword) {
    const ismatch = await bcrypt.compare(candidatePassword,this.password);
    return ismatch;
}

module.exports = mongoose.model("Users",userSchema);