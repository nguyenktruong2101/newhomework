var {fetchBreakingNews, fetchAllNewsCategory, categorizedNews, fetchOneNewsCategory, fetchBreakingNewsUnlimit} = require('../../controllers/newspage/fetchNewsPage')
var router = require('express').Router()
router.get('/breakingnews', fetchBreakingNews)
router.get('/newscategory', fetchAllNewsCategory)
router.get('/specific/:news_category_id', categorizedNews)
router.get('/category/:cate_id', fetchOneNewsCategory)
router.get('/breaking/all', fetchBreakingNewsUnlimit)

module.exports = router