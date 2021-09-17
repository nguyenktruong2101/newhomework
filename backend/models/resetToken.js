var mongoose = require('mongoose')
var ResetTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true
    },
    token:{
        type: String,
        required: true
    }
})
exports.resetToken = mongoose.model('Reset_token', ResetTokenSchema)