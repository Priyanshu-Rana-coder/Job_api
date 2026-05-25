const User=require('../models/User')
const jwt= require('jsonwebtoken')
const {unauthenticatedError, UnauthenticatedError}=require('../errors')


const auth = (req,res,next)=>{
    const authHeader=req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError("Authentication Failed")
    }
    const token=authHeader.split(' ')[1]
    try {
        const payload=jwt.verify(token, process.env.JWT_SECRET)
        // attach the user to the job routes
        req.user={userId:payload.userId,name: payload.name}
        next() 
    } catch (error) {
        throw new UnauthenticatedError('Authentication Error')
    }


}

module.exports=auth
