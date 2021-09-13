var mongoose = require('mongoose')
var NewsSchema = new mongoose.Schema({
    title: String,
    content: String,
    breaking: String,
    image: String,
    news_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"news_categories",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
 
 },{timestamps: true})
 exports.news = mongoose.model('New', NewsSchema)
