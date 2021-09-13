var router = require('express').Router()
const { model } = require('mongoose')
var {userFollow, userUnfollow} = require('../../controllers/follow-controller/user_follow.js')
var {checkFollow, checkUnfollow} = require('../../middlewares/checkFollow.js')


router.put('/user/:id/follow',checkFollow, userFollow)
router.put('/user/:id/unfollow',checkUnfollow, userUnfollow)



module.exports = router;