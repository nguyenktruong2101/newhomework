var userProfile = require("../../models/users")
exports.profile = function(req, res){
    userProfile.user.findById(req.params.id,(err, result) =>{
        res.send(result)})
}
exports.getAllUsers= function(req, res){
    userProfile.user.find({},(err, result) =>{
        res.send(result)})
}






