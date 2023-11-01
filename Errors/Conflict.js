

const CustomApiError=require('./CustomApiError')

class Conflict extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode=409
    }
}

module.exports=Conflict