var userProfile = require("../../models/users")
exports.profile = function(req, res){
    userProfile.user.findById(req.params.id,(err, result) =>{
        res.send(result)})
}
exports.getAllUsers= function(req, res){
    userProfile.user.find({},(err, result) =>{
        res.send(result)})
}
exports.searchByUsername = function(req, res){
    userProfile.user.find({username: {"$regex": `${req.params.keyword}`, "$options": "i" }, emailVerified: true}, (err, result) => {
        res.send(result)
    })
}






