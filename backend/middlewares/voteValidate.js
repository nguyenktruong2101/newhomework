var Posts = require('../models/posts').post
exports.voteValidate = (req, res, next) => {
    Posts.findOne({
        _id: req.body.post_id
    }, function (err, result) {
        if (err) {
            return res.send("Post Not Found 1")
        } else {
            next()
        }
    })
}
exports.votevalidate2 = async (req, res, next) => {
    const thisPost = await Posts.findOne({
        _id: req.body.post_id
    })
    if(!thisPost) {
        return res.send("NF")
    } else {
        next()
    }
}