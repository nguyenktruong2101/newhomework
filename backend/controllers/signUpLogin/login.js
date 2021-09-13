var jwt = require("jsonwebtoken")
var User = require('../../models/users').user;
var bcrypt = require('bcryptjs')
var {SECRET_KEY} = process.env

exports.login = (req, res) => {
    User.findOne({ username: req.body.username }, function (error, user) {
        if (error) {
            return res.send(error)
        }
        if (user) {
            console.log('hello')
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.send({ message: "Wrong password. Please try again!" })
            } else {
                if (user.emailVerified) {
                    console.log("gm")
                    let jwtToken = jwt.sign({ id: user._id }, SECRET_KEY, {
                        expiresIn: 10800
                    })
                    let authenticatedUser = {
                        id: user._id,
                        username: user.username,
                        accessToken: jwtToken
                    }
                    return res.send({ authenticatedUser })
                } else {
                    return res.send({
                        deleteTokenUser: user._id,
                        message: "Your email has not been verified."
                    })
                }
            }
        } else {
            return res.send({ message: "Wrong username. Please try again!" })
        }
    })
}