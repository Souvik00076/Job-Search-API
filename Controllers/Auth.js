const BadRequestError = require('../Errors/BadRequestError')
const CustomApiError = require('../Errors/CustomApiError')
const Conflict=require('../Errors/Conflict')
const UserModel=require('../Models/User')
const {StatusCodes}=require('http-status-codes')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const UnauthenticatedError = require('../Errors/UnauthenticatedError')
const Cache=require('../Service/Cache')
require('../Service/DatabaseHook')


const registerAuth=async (req,res)=>{
    const {email,name,password}=req.body

    if(!email || !name || !password){
        throw new BadRequestError("Please provide name, email and password")
    }
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)
    const temp={email,name,password:hash}
    const user=await UserModel.create(temp)
    const token=await user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name:user.name,msg:'Registered Succefully'},token})
}
const loginAuth=async (req,res)=>{
    const {email,password}={...req.body}
    if(!email || !password){
        throw new BadRequestError('Please Provide Email & Password')
    }    
    const user=await UserModel.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid Email')
    }
    const isMatch=await user.match(password)
    if(!isMatch){
        throw new UnauthenticatedError('Invalid Password')
    }
    const token=await user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
}


module.exports={
    registerAuth,
    loginAuth
}