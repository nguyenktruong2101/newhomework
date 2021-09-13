var NewsCategory = require('../../models/news_category').news_category;

exports.getNewsCategory = function(req, res) {
    NewsCategory.find({}, (err, result) => {
        res.send(result)
    })
}