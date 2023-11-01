const mongoose=require('mongoose')
const JobsSchema=mongoose.Schema({
    company_name:{
        type:String,
        minLength:3,
        required:[true,`Company Name cannot be empty`]
    },
    position:{
        type:String,
        enum:['Full Time','Part Time'],
        required:[true,`Position field cannot be empty`]
    },
    role:{
        type:String,
        required:[true,`Role cannot be empty`]
    },
    status:{
        type:String,
        enum:[`pending`,`interview`,`ended`],
        default:`pending`
    },
    location:{
        type:String,
    },
    mode:{
        type:String,
        enum:[`In-Office`,`Work From Home`,`Hybrid`],
        required:[true,`Mode cannot be empty`]
    },
    description:{
        type:String,
        required:[true,`Description cannot be empty`]
    },
    created_by:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,`Please provide user`]
    },
    applied: [{type:String,
        required:[true,`Email address must be added`]}]
},{timestamps:true})


const JobModel=mongoose.model('Jobs',JobsSchema)
module.exports=JobModel