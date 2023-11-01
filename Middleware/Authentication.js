const jwt=require('jsonwebtoken')
const { UnauthenticatedError}=require('../Errors/UnauthenticatedError')

const auth=async (req,res,next)=>{
    const authHeader=req.headers.authorization
    console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError("Authentication Invalid")
    }

    
    const token=authHeader.split(' ')[1]

    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET)
        console.log(payload)
        req.user={userId:payload.userId,name:payload.name}
        next()
    }catch(error){
        
        throw new UnauthenticatedError("Authentication Invalid")
    }
}
module.exports=auth