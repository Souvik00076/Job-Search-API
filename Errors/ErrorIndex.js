

const CustomApiError=require('./CustomApiError')
const BadRequestError=require('./BadRequestError')
const UnauthenticatedError=require('./UnauthenticatedError')
const Conflict=require('./Conflict')
const InternalServerError=require('./InternalServerError')

module.exports={
    CustomApiError,
    BadRequestError,
    UnauthenticatedError,
    Conflict,
    InternalServerError
}