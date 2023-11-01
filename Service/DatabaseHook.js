const mongoose=require('mongoose')
const Cache=require('./Cache')
const UserModel=require('../Models/User')
const JobModel=require('../Models/Jobs')
const { json } = require('express')
const exec=mongoose.Query.prototype.exec



function getModelFlag(str){
    if(str.toLowerCase()==='users') return 0 
    return 1
}
mongoose.Query.prototype.doCache=function(options={}){
    this._id=JSON.stringify(options.user_id || '')
    this._cache=true
    return this
}
mongoose.Query.prototype.exec=async function(){
    
    
    if(!this._cache){
        return await exec.apply(this,arguments)
    }
    const memory=new Cache()
   
     let modelFlag=getModelFlag(this.mongooseCollection.name)
    const key=JSON.stringify(Object.assign({},this.getQuery(),{
        CollectionName:this.mongooseCollection.name
    }))
    const cacheSearchResult=await memory.getCache(this._id,key)
    if(cacheSearchResult){
        console.log('caching')
        const jsonObj=JSON.parse(cacheSearchResult)
        return Array.isArray(jsonObj)
        ? jsonObj.map(d=>{
            if(modelFlag===0) return new UserModel(d)
            return new JobModel(d)
        })
        : (()=>{

            if(modelFlag===0) return new UserModel(jsonObj)
            return new JobModel(jsonObj)
        })();
    }
    
    const result= await exec.apply(this,arguments)
    memory.setCache(this._id,key,JSON.stringify(result))
    return result
}