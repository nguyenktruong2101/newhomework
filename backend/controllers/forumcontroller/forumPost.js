const Posts = require('../../models/posts');
const Post_category = require('../../models/post_category');

exports.forumPost = (req, res) => {
    Posts.post
        .find({}, (err, result) => {
            res.send(result);
        })
        .sort({ createdAt: 'desc' });
};

exports.fetchPostDetail = (req, res) => {
    Posts.post.findById(req.params.id, (err, result) => {
        res.send(result);
    });
};

exports.fetchUserPost = (req, res) => {
    Posts.post
        .find({ user_id: req.params.id }, (err, result) => {
            res.send(result);
        })
        .sort({ createdAt: 'desc' });
};

exports.fetchPostCategories = (req, res) => {
    Post_category.post_category.find({}, (err, result) => {
        res.send(result);
    });
};
