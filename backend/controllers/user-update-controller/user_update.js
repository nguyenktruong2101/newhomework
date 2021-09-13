var Users = require('../../models/users').user
 

exports.userUpdate = (req,res) => {
  //hit the update button
  Users.findByIdAndUpdate({_id: req.params.id}, {
    username: req.body.username,
    email: req.body.email,
    gender: req.body.gender,
    address: req.body.address,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender
  
  }, function(err, result) {
    if(err){
      return res.send(err)
    }
    res.send(result)
  })
}