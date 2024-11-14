const User = require('../model/user');
const { StatusCodes } = require('http-status-codes');
const UnauthenticatedError = require('../errors/unauthenticated');
const {BadRequestError} = require('../errors');

const signUp = async (req,res,next) => {
    try{
        const user = await User.create({ ...req.body });
        // const token = user.createJWT();
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
            throw new UnauthenticatedError('The Entered credentials are invalid' );
        }
        const passwordCompare = user.passwordCompare(password);
        if(!passwordCompare){
            throw new UnauthenticatedError('Invalid Credentials')
        }
        const token = user.createJWT();
        // req.session.user = user.name;
        // const cookieOptions = {
        //     expires:new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        //     httpOnly:true,
        // }
        // res.cookie('token',token,cookieOptions);
        // res.send(message)
        res.status(StatusCodes.OK).json({user,token});
    }catch(error){
        next(error);
    }
}

const logout = async(req, res, next) => {
    try{
        res.clearCookie('token');
        req.session.destroy();
        res.status(200).send('Logged out');
    }catch(error){
        next(error);
    }
};



const adminLogin = async (req,res,next) => {
    try {
        const {name,password,secret} = req.body;
        if(!name || !password || !secret){
        throw new BadRequestError('Please provide name or password')
        }
        if(secret !== "MOVIEtIME"){
            throw new UnauthenticatedError('The Key does not match');
        }
        
        const user = await User.create({ ...req.body });
        const token = user.createJWT();
        res.status(StatusCodes.OK).json({user,token});
    }catch(error){
        next(error);
    }
}



module.exports = {
    signUp,
    login,
    logout,
    adminLogin
}