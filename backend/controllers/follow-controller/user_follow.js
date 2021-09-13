var Users = require('../../models/users').user

exports.userFollow = (req, res) => {
  Users.findByIdAndUpdate({_id: req.body.id}, {
    $push: {followers: req.params.id}
  }, function(err, result) {
    if(err){
      return res.send(err)
    }
    res.send(result)
  })
}

exports.userUnfollow = (req, res) => {
  Users.findByIdAndUpdate({_id: req.body.id}, {
    $pull: {followers: req.params.id}
  }, function(err, result) {
    if(err){
      return res.send(err)
    }
    res.send(result)
  })
}