var router = require('express').Router()
var {voteValidate, votevalidate2} = require('../../middlewares/voteValidate')
var {create_vote, delete_vote} = require('../../controllers/forumcontroller/vote')
router.put('/addvote',[voteValidate, votevalidate2], create_vote)

router.put('/deletevote',[voteValidate, votevalidate2], delete_vote)

module.exports = router