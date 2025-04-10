const User = require('../model/user');
const Admin = require('../model/admin');
const { StatusCodes } = require('http-status-codes');
const UnauthenticatedError = require('../errors/unauthenticated');
const {BadRequestError} = require('../errors');



const signUp = async (req,res,next) => {
    try{
        const user = await User.create({ ...req.body });
        res.status(StatusCodes.CREATED).json({user});
    }catch(error){
        next(error);
    }
}

const login = async (req,res,next) => {
    try {    
        const {email,password} = req.body;

        if(!email || !password){
            throw new BadRequestError('Please provide email and password')
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:'The entered credentials are invalid or you must sign up'})
        }
        const passwordCompare = await user.passwordCompare(password);
        
        if(!passwordCompare){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:'Invalid Credentials'})
        }
        const token = user.createJWT();
        
        res.status(StatusCodes.OK).json({token,user,msg:"Login Successful"});
    }catch(error){
        next(error);
    }
}

// const logout = async(req, res, next) => {
//     try{
//         res.clearCookie('token');
//         res.clearCookie('user');
//         res.status(StatusCodes.OK).send('Logged out');

//     }catch(error){
//         next(error);
//     }
// };

const forgetPassword = (req,res,next) => {
    try{
        let code = ''
        for(let i=0;i<4;i++){
            code += Math.floor(Math.random() * 10);
        } 
        res.status(OK).send(code);
    }catch(error)
    {
        next(error);
    }
} 

const resetPassword = async (req,res,next) => {
    try{
        const { email, otp } = req.body;

        if (!email || !otp) {
          return res.status(400).json({ message: 'Email and OTP are required' });
        }
      
        const otpEntry = await OTP.findOne({ email });
      
        if (!otpEntry) {
          return res.status(404).json({ message: 'OTP not found' });
        }
      
        if (otpEntry.expiresAt < new Date()) {
          return res.status(400).json({ message: 'OTP expired' });
        }
      
        if (otpEntry.code !== otp) {
          return res.status(400).json({ message: 'Invalid OTP' });
        }
      
        // Optional: delete OTP after successful verification
        await OTP.deleteOne({ email });
      
        return res.status(200).json({ message: 'OTP verified successfully' });
      }
      catch(error){
        next(error);
      }
      
    }


const adminLogin = async (req,res,next) => {

    try {
        const {email,secret} = req.body;
        
        
        if(!email || !secret){
            throw new BadRequestError('Please provide email or secret')
        }
        const admin = await Admin.findOne({email});

        if(secret !== "MOVIEtIME"){    
            throw new UnauthenticatedError('The Key does not match');
        }
        
        const token = admin.createJWT();
        
        res.status(StatusCodes.OK).json({admin,token});
    }catch(error){
        next(error);
    }
}



module.exports = {
    signUp,
    login,
    // logout,
    adminLogin
}