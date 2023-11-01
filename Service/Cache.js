const redis=require('redis')

class Cache{
    constructor(){
        if(!Cache.instance){
            this.client=redis.createClient({
                host:process.env.HOST,
                port:process.env.REDIS_PORT
            })
            this.client.connect()
            Cache.instance=this
        }
            return Cache.instance
    }
    async getCache(_hash,key){
        const user=await this.client.get(_hash,key)
        return user
    }
    async setCache(_hash,key,data){
        await this.client.set(_hash,key,data)
    }
}
module.exports=Cache