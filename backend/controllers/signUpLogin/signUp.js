var User = require('../../models/users').user;
var Token = require('../../models/verifyToken').verifyToken;
var bcrypt = require('bcryptjs')
const crypto = require('crypto');
const sendEmail = require('./sendEmailVerification');
const {EMAIL_BASE_URL} = process.env

exports.signup = async (req,res) => {
    var user = await new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        userType: ['user']
    }).save()
    var newToken = {
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex")
    }
    let savedToken = await new Token(newToken).save()
    const verifyLink = `${EMAIL_BASE_URL}/user/verify/${user._id}/${savedToken.token}`
    sendEmail.sendEmail(user.email, verifyLink)
    res.send({message:"Verification email has been sent to you. Please verify your email to continue!"})
}