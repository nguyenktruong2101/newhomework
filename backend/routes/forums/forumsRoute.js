var router = require('express').Router()
var {forumPost, fetchPostDetail, fetchPostCategories, fetchUserPost} = require('../../controllers/forumcontroller/forumPost')
var {userComment} = require('../../controllers/forumcontroller/userComment')

router.get("/comment/:id", userComment)
router.get("/posts/:id",fetchPostDetail)
router.get("/post_category", fetchPostCategories)
router.get("/posts", forumPost)
router.get("/userpost/:id", fetchUserPost)

module.exports = router;