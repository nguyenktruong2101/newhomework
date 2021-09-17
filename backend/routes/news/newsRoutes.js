var router = require('express').Router();
var {
    getArticle,
    getArticleDetails,
    addArticle,
    deleteArticle,
    updateArticle,
} = require('../../controllers/newsController/newsCRUD');
var {
    getNewsCategory,
} = require('../../controllers/newsController/newsCategory');

var multer = require('multer');

var {getArticle,getArticleDetails, addArticle, deleteArticle, updateArticle} = require('../../controllers/newsController/newsCRUD')
var {getNewsCategory} = require('../../controllers/newsController/newsCategory')

// Image uploader
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../frontend/public/newsUploads')
    }
    // filename: function (req, file, cb) {
    //     // cb(null, cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)))
    //     cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    // }

    // filename: (req, file, callback) => { //this is just setting a unique filename
    //     let temp = file.originalname.split('.');
    //     const filename = temp[0].replace(/:/g, '-') + crypto.randomBytes(16).toString("hex") + Date.now() +'.' + temp[1]
    //     callback(null, filename);
    // }
})


var upload = multer({
    storage,
    // limits: {
    //     fileSize: 1000000 // 1000000 Bytes = 1 MB
    // }
    // fileFilter(req, file, cb) {
    //     if (!file.originalname.match(/\.(png|jpg)$/)) {
    //         // upload only png and jpg format
    //         return cb(new Error('Please upload a Image'))
    //     }
    //     cb(undefined, true)
    // }
});

router.get('/articles', getArticle);
router.get('/articles/:id', getArticleDetails);
router.get('/news-catergory', getNewsCategory);

router.post('/articles', upload.single('image'), addArticle);
router.put('/articles', upload.single('image'), updateArticle);
router.delete('/articles/delete', deleteArticle);

module.exports = router;
