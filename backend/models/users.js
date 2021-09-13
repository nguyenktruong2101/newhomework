var mongoose = require('mongoose')
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    emailVerified:{
        type: Boolean,
        default:false
    },
    name: String,
    dateOfBirth: String,
    gender: String,
    phoneNumber: String,
    address: String,
    userType: [String],
    avatar: String,
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }]
 })
 exports.user = mongoose.model('User', UserSchema)