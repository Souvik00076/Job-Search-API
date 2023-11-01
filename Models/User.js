const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const timestampedFieldSchema = {
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs',
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
};
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        required:[true,'Name cannot be empty']
    },
    email:{
        type:String,
        match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        required:[true,"Email cannot be empty"],
        unique:[true,"Email already present"]
    },
    password:{
        type:String,
        minLength:3,
        required:[true,"Password cannot be empty"]
    },
    jobs_created:[timestampedFieldSchema],
    jobs_saved:[timestampedFieldSchema],
    jobs_applied:[timestampedFieldSchema],
})
UserSchema.methods.getName=function(){
    return this.name
}
UserSchema.methods.createJWT=async function(){
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_SECRET_LIFECYCLE
        })
}
UserSchema.methods.match=async function(creadential){
    const isMatch=await bcrypt.compare(creadential,this.password)
    return isMatch
}
const UserModel=mongoose.model("Users",UserSchema)
module.exports=UserModel