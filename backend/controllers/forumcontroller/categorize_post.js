const Posts = require('../../models/posts').post;
const Post_Category = require('../../models/post_category').post_category;
const mongoose = require('mongoose');

//Categorize

exports.categorize_by_posts = async (req, res) => {
    const category = await Post_Category.findOne({
        _id: req.params.category_id,
    });
    Posts.find({ post_category_id: category._id }, function (err, posts) {
        if (err) {
            return res.send(err);
        }
        console.log(typeof posts.post_category_id);
        if (posts) {
            res.send(posts);
        }
    }).sort({ createdAt: 'desc' });
};
