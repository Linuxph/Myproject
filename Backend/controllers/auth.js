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
            res.status(StatusCodes.BAD_REQUEST).json({msg:'The entered credentials are invalid or you must sign up'})
        }
        const passwordCompare = await user.passwordCompare(password);
        
        if(!passwordCompare){
            res.status(StatusCodes.BAD_REQUEST).json({msg:'Invalid Credentials'})
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



const adminLogin = async (req,res,next) => {

    try {
        const {email,secret} = req.body;
        console.log(email,secret);
        
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