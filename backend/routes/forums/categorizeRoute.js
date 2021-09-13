var router = require('express').Router()
var {categorize, categorize_by_posts} = require('../../controllers/forumcontroller/categorize_post')
router.get('/categorize_post/:category_id',categorize_by_posts)

module.exports = router