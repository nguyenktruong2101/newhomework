var User = require("../models/users").user
var Token = require('../models/verifyToken').verifyToken;

const checkDuplicateUsername = (req, res, next) => {
    User.findOne({ username: req.body.username }, function (error, user) {
        if (error) {
            return res.send(error);
        }
        if (user) {
            return res.send({ message: "Username is already existed." })
        }
        next();
    })
}
const checkDuplicateEmail = (req, res, next) => {
    User.findOne({ email: req.body.email }, function (error, user) {
        if (error) {
            return res.send(error)
        }
        if (user) {
            return res.send({ message: "Email is already existed." })
        }
        next();
    })
}
const deleteVerifyToken = async (req, res, next) => {
    if (req.body.deleteToken) {
        console.log("delete verify")
        const token = await Token.findOne({
            userId: req.body.deleteToken
        });
        if (token) {
            console.log("delete verify 1")
            await Token.findByIdAndRemove(token._id)
            console.log("delete verify 2")
        };
    }
    next();
}


module.exports = { checkDuplicateEmail, checkDuplicateUsername, deleteVerifyToken }