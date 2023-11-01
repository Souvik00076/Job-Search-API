const express=require('express')
const app=express()
require('express-async-errors')
const authRouter=require('./Routes/Auth')
const jobsRouter=require('./Routes/Jobs')
const userJobRouter=require('./Routes/UserRoutes/Jobs')
const connectDb=require('./config/Connection')
const ErrorHandler=require('./Middleware/ErrorHandler')
const notFoundHandler=require('./Middleware/NotFound')
const authenticateUser=require('./Middleware/Authentication')
require('dotenv').config()
app.use(express.json())
app.use('/api/auth/v1/',authRouter)
app.use('/api/jobs/v1/',authenticateUser,jobsRouter)
app.use('/api/user/jobs/v1/',authenticateUser,userJobRouter)
app.use(notFoundHandler)
app.use(ErrorHandler)
const PORT=process.env.PORT || 3000
 


const startServer=async ()=>{
    try{
        
        await connectDb(process.env.MONGO_URI)
        app.listen(PORT,console.log(`Server Started At PORT number ${PORT}`))
    }catch(error){
        console.log(error)
    }
}
startServer()