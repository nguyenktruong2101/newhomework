var User = require('../../models/users').user;
var Token = require('../../models/resetToken').resetToken;
var bcrypt = require('bcryptjs')
const crypto = require('crypto');
const sendEmail = require('./sendEmailReset');
const {EMAIL_BASE_URL} = process.env

exports.askForEmail = (req,res) => {
    User.findOne({email: req.body.email}, async function(error, result){
        if(error){
            return console.log(error)
        }
        if(result){
            if(!result.emailVerified){
                return res.send({message: "This email has not been verified"})
            } else {
                let token = await Token.findOne({ userId: result._id });
                if(!token){
                    var newToken = {
                        userId: result._id,
                        token: crypto.randomBytes(32).toString("hex")
                    }
                    let savedToken = await new Token(newToken).save()
                    const verifyLink = `localhost:3000/password-reset/${result._id}/${savedToken.token}`
                    sendEmail.sendEmail(result.email, verifyLink)
                    return res.send({message:"Reset password email has been sent to you. Please check your email to reset your password!"})
                }

            }
        } else {
            return res.send({message: "Email is not existed"})
        }
    })
}

exports.resetPassword = async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        return res.status(400).send({message: "Invalid link"})
    } else {
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) {
            return res.status(400).send({message: "Invalid link"})
        } else{
        User.findOneAndUpdate({_id: req.params.userId}, {password: bcrypt.hashSync(req.body.password, 8)}, function(error, result) {
            if (result){
                token.delete()
                return res.send({message: "Your password is successfully reset. Please log in again with your new password!"})
            }
        })
        }
    };
}