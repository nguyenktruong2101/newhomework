const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts',
        },
        content: String,
    },
    { timestamps: true }
);
exports.comment = mongoose.model('Comment', CommentSchema);
