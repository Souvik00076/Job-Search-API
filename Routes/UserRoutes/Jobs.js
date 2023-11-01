const express=require('express')
const router=express.Router()


const {  getRelatedJobs,getAppliedJobs,getAllSavedJobs,saveJob,applyJob}=require('../../Controllers/Jobs')

router.route('/').get(getRelatedJobs)
router.route('/saved').get(getAllSavedJobs)
router.route('/applied-jobs').get(getAppliedJobs)
router.route('/save/:id').post(saveJob)
router.route('/apply/:id').post(applyJob)




module.exports=router