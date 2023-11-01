const express=require('express')

const router=express.Router()
const {loginAuth,registerAuth}=require('../Controllers/Auth')
router.route('/login').post(loginAuth)
router.route('/register').post(registerAuth)
module.exports=router
