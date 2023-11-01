

const CustomApiError=require('./CustomApiError')
class UnauthenticatedError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode=401
    }
}

module.exports=UnauthenticatedError