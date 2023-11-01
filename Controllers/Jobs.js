const {StatusCodes}=require('http-status-codes')
const JobModel=require('../Models/Jobs')
const UserModel=require('../Models/User')
const NotFoundError = require('../Errors/NotFoundError')
const BadRequestError=require('../Errors/BadRequestError')
const bcrypt=require('bcryptjs')
require('../Service/DatabaseHook')

const getAllJobs=async (req,res)=>{
    const _id=req.user.userId
    const documents=await JobModel.find({created_by:_id}).doCache({user_id:_id})
    res.status(StatusCodes.OK).json({docs:{documents},totalPages:documents.length})
}

const getJob=async (req,res)=>{
    const {user:{userId},params:{ id:jobId}}=req
    const job=await JobModel.find({_id:jobId,created_by:userId})
    res.status(StatusCodes.OK).json({job})

}

const deleteJob=async (req,res)=>{
    const {user:{userId},params:{ id:jobId}}=req
    const job=JobModel.findByIdAndRemove({_id:jobId,created_by:userId})
    if(!job) throw new BadRequestError('Job Does Not Exist')
    res.status(StatusCodes.OK).json({job})
}

const updateJob=async (req,res)=>{
   const {user:{userId},params:{id:jobId},body:{company,position}}=req

   if(company==='' || position===''){
        throw new BadRequestError(`Company name & position cannot be empty`)
   }

   const job=await JobModel.findByIdAndUpdate({_id:jobId,created_by:userId},req.body,{new:true,validators:true})
   if(!job){
    throw new NotFoundError(`No job with ${jobId}`)
   }
   res.status(StatusCodes.OK).json({job})
}

const createJob=async (req,res)=>{
    user_id=req.user.userId
    const job=await JobModel.create(req.body)
    const user=await UserModel.findById({_id:user_id})
    if(!user)throw new BadRequestError('User Not Fount')
    user.jobs_created.push({job_id:job._id})
    await user.save()
    res.status(StatusCodes.CREATED).json({job})
}

const getRelatedJobs=(req,res)=>{
    console.log('called here get related jobs')
    res.status(StatusCodes.OK).send('All jobs')
}

const getAppliedJobs=async (req,res)=>{
    const user_id=req.user.userId
    const user=await UserModel.findById({_id:user_id})
    if(!user)throw new BadRequestError('User Not Found')
    const data=user.jobs_applied
    res.status(StatusCodes.OK).send({data})
}

const getAllSavedJobs=async (req,res)=>{
    const user_id=req.user.userId
    const user=await UserModel.findById({_id:user_id})
    if(!user)throw new BadRequestError('User Not Found')
    const data=user.jobs_saved
    res.status(StatusCodes.OK).send({data})
}

const saveJob=async (req,res)=>{
    const {user:{userId},params:{id:jobId}}=req
    const user=await UserModel.findById({_id:userId})
    if(!user) throw new BadRequestError('User Not Found')
    user.jobs_saved.push({job_id:jobId})
    await user.save()
    res.status(StatusCodes.OK).json({user})
}
const applyJob=async (req,res)=>{
    const {user:{userId},params:{id:jobId}}=req
    const user=await UserModel.findById({_id:userId})
    if(!user) throw new BadRequestError('User Not Found')
    user.jobs_applied.push({job_id:jobId})
    await user.save()
    res.status(StatusCodes.OK).json({user})
}
module.exports={
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob,
    getRelatedJobs,
    getAppliedJobs,
    getAllSavedJobs,
    saveJob,
    applyJob
}