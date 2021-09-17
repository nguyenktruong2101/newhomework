const Post = require('../../models/posts').post;
const Comment = require('../../models/comments').comment;
const fs = require('fs');

const { uploadFile, deleteFile } = require("../s3")

const bucketName = "covi-away-app/postUploads"

// POST CRUD
exports.postPost = async (req, res) => {

    if (req.file) {
        const file = req.file;
        console.log(file)
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            image: 'postUploads/' + req.file.filename + '.' +req.file.mimetype.split('/')[1],
            post_category_id: req.body.post_category_id,
            user_id: req.body.user_id
        });
        try {
            const savedPost = await newPost.save();
            if(savedPost) {
                const s3Result = await uploadFile(file, bucketName)
                console.log(s3Result)
                res.status(200).send(savedPost);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    } else {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            post_category_id: req.body.post_category_id,
            user_id: req.body.user_id
        });
        try {
            const savedPost = await newPost.save();
            res.status(200).send(savedPost);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

};

exports.putPost = async (req, res) => {

    console.log(req.file)
    //If update with new image
    if (req.file) {
        Post.findById({ _id: req.params.id }, async (error, result) => {
            if (result) {
                console.log(req.file)
                deleteFile(result.image, bucketName)
                Post.findByIdAndUpdate({ _id: req.params.id }, {
                    title: req.body.title,
                    content: req.body.content,
                    image: 'postUploads/' + req.file.filename + '.' +req.file.mimetype.split('/')[1],
                    post_category_id: req.body.post_category_id
                }, async (error, result) => {
                    if (error) {
                        console.log(error)
                    } else {
                        const newImage = await uploadFile(req.file, bucketName)
                        console.log(newImage)
                        res.send(result)
                    }
                })

            }
        })
        //If update without new image
    } else {
        try {
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).send(updatedPost);
        } catch (err) {
            console.log(err);
    
            res.status(500).send(err);
        }
    }

    
};
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        try {
            await post.delete();
            if (post.image !== null) {
                deleteFile(post.image, bucketName)
            }

            res.status(200).send('Post has been deleted...');
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).send(post);
    } catch (err) {
        res.status(500).send(err);
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
        const updatedComment = await Comment.findByIdAndUpdate(
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
