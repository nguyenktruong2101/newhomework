const mongoose = require('mongoose');
const Post_categorySchema = new mongoose.Schema({
    name: String,
});
exports.post_category = mongoose.model('Post_category', Post_categorySchema);
