const jwt = require('jsonwebtoken');
const { user } = require('../models/users');
const {SECRET_KEY} = process.env
exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token){
        return res.send('No token provided')
    }
    jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if(error){
            return res.send({message: "Unauthorized"})
        }
        req.user = decoded;
        next();
    })
}
exports.isAdmin = (req,res,next) => {
    user.findById(req.user.id, function(error, user){
        if(error){
            return res.send(error)
        }
        if (user.userType.includes('admin')){
            next()
        }
        else{
            return res.send({isAdmin: false})
        }
    })
}
exports.isReporter = (req,res,next) => {
    user.findById(req.user.id, function(error, user){
        if(error){
            return res.send(error)
        }
        if (user.userType.includes('reporter')){
            next()
        }
        else{
            return res.send({isReporter: false})
        }
    })
}