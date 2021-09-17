var Users = require('../../models/users').user
var bcrypt = require('bcryptjs')
const fs = require('fs')
var { uploadFile, deleteFile } = require('../s3')

const bucketName = "covi-away-app/userUploads"

exports.userUpdate = (req, res) => {
  //hit the update button
  Users.findByIdAndUpdate({ _id: req.params.id }, {
    username: req.body.username,
    email: req.body.email,
    gender: req.body.gender,
    address: req.body.address,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender

  }, function (err, result) {
    if (err) {
      return res.send(err)
    }
    res.send(result)
  })
}
exports.changePassword = (req, res) => {
  Users.findById({ _id: req.params.id }, function (error, result) {
    if (error) {
      return console.log(error)
    }
    if (result) {
      if (!bcrypt.compareSync(req.body.oldPassword, result.password)) {
        return res.send({ message: "Wrong password. Please try again!" })
      } else {
        Users.findByIdAndUpdate({ _id: req.params.id }, {
          password: bcrypt.hashSync(req.body.password, 8)
        }, function (err, result) {
          if (err) {
            return res.send(err)
          }
          res.send({ message: "Password is successfully changed" })
        })
      }
    }
  })

}

exports.updateAvatar = (req, res) => {
  Users.findById({ _id: req.params.id }, (error, result) => {
    if (result) {
      if (result.avatar) {
        //delete old image
        console.log("Deleting old image")
        deleteFile(result.avatar, bucketName)
        fs.unlink('./../frontend/public/userUploads/' + result.avatar, (err) => {
          if (err) {
            console.error(err)
            return
          }
        })
        //Add new image
        console.log("UPLOAD new image after delete")
        console.log(req.file)
        Users.findByIdAndUpdate({ _id: req.params.id }, {
          avatar: 'userUploads/' + req.file.filename + '.' +req.file.mimetype.split('/')[1],
        }, async (error, result) => {
          if (error) {
            console.log(error)
          } if(result) {
            const newImage = await uploadFile(req.file, bucketName)
            console.log(newImage)
            res.send(result)
          }
        })
      } else {
        //Add new image
        console.log("UPLOAD new image")
        console.log(req.file)
        
        Users.findByIdAndUpdate({ _id: req.params.id }, {
          avatar: 'userUploads/' + req.file.filename + '.' +req.file.mimetype.split('/')[1],
        }, async (error, result) => {
          if (error) {
            console.log(error)
          } if(result) {
            const newImage = await uploadFile(req.file, bucketName)
            console.log(newImage)
            res.send(result)
          }
        })
      }
    }
  })
}