var mongoose = require('mongoose')
var VerifyTokenSchema = new mongoose.Schema({
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
exports.verifyToken = mongoose.model('Verify_token', VerifyTokenSchema)