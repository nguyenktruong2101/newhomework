var User = require("../models/users").user

exports.checkFollow = (req, res, next) => {
  User.findOne({_id: req.body.id}, function(error, user){
    if(error){
        return res.send(error);
    }
    if(user){
        let followersArray = []
        followersArray = user.followers
        for(index = 0; index < followersArray.length; index++) {
          if(followersArray[index] == req.params.id) {
            return res.send("Already followed this account")
          }
        }       
    }
    next()
    
  })
}

exports.checkUnfollow = (req, res, next) => {
  User.findOne({_id: req.body.id}, function(error, user){
    if(error){
        return res.send(error);
    }
    if(user){
        let followersArray = []
        let count = 0
        followersArray = user.followers
        for(index = 0; index < followersArray.length; index++) {
          if(followersArray[index] == req.params.id) {
            count = count + 1
          }
        }  
        if (count == 0) {
          return res.send("You have not followed this account")
        }
             
    }
    next()
    
  })
}

