var Posts = require('../../models/posts').post
var User = require('../../models/users').user

//Create new vote
exports.create_vote = async (req, res) => {
    //Hit a like
    var currentVote = await Posts.findOne({_id: req.body.post_id})
    if(currentVote.vote.includes(req.body.user_id)){
        return res.send("User has voted")
    }
    currentVote.vote.push(req.body.user_id)
    Posts.findOneAndUpdate({_id: req.body.post_id},{ vote: currentVote.vote}, {new: true},function(err, result){
        if(err){
            return res.send(err)
        }
        res.send(result)
    })
}

exports.delete_vote = async (req, res) => {
    //Hit a like
    var currentVote = await Posts.findOne({_id: req.body.post_id})
    let voteArray = currentVote.vote
    if(!voteArray.includes(req.body.user_id)){
        return res.send("User has not voted")
    }
    let d =  voteArray.filter((delete_like, id)=>{
        return delete_like.toString() !== req.body.user_id
    })
    Posts.findOneAndUpdate({_id: req.body.post_id},{vote: d}, {new: true}, function(err, result){
        if(err){
            return res.send(err)
        }
        res.send(result)
    })
}