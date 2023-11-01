
const CustomApiError=require('./CustomApiError')

class InternalServerError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode=500
    }
}

module.exports=InternalServerError