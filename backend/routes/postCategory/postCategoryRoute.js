const router = require('express').Router();
const { getPostCategory } = require('../../controllers/postCategoryController');

router.get('/', getPostCategory);

module.exports = router;
