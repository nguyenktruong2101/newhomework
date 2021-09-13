const PostCategory = require('../../models/post_category').post_category;

exports.getPostCategory = async (req, res) => {
    try {
        const postCategory = await PostCategory.find({});
        res.status(200).json(postCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
