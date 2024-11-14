const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    admin_name:{
        type:String,
        required:[true,'Name cannot be empty'],
        maxlength:[50,'Name cannot be more than 50 letters.']
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

module.exports = mongoose.model("Admin",adminSchema);