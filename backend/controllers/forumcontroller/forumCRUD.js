const Post = require('../../models/posts').post;
const Comment = require('../../models/comments').comment;

// POST CRUD
exports.postPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.putPost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        console.log(err);

        res.status(500).json(err);
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        try {
            await post.delete();
            res.status(200).json('Post has been deleted...');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};

// COMMENT CRUD
exports.postComment = async (req, res) => {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.putComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        try {
            const updatedComment = await comment.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedComment);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        try {
            await comment.delete();
            res.status(200).json('Comment has been deleted...');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.status(200).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
