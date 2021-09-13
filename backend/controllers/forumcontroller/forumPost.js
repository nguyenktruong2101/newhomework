
    var Posts = require("../../models/posts")
    exports.forumPost = function(req, res){
    Posts.post.find({},(err, result) =>{
        res.send(result)}).sort({'createdAt': 'desc'})
    }

    exports.fetchPostDetail = function (req, res){
    Posts.post.findById(req.params.id,(err, result) =>{
        res.send(result)})
    }

    exports.fetchUserPost = function(req, res){
        console.log('abc')
    Posts.post.find({user_id : req.params.id},(err, result) =>{
        
            res.send(result)}).sort({'createdAt': 'desc'})
    }

    var Post_category = require("../../models/post_category")
    exports.fetchPostCategories = function (req, res){
        Post_category.post_category.find({},(err, result) =>{
            res.send(result)})
    }


