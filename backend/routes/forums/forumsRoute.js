const router = require('express').Router();
const multer = require('multer');
const {
    forumPost,
    fetchPostDetail,
    fetchPostCategories,
    fetchUserPost,
} = require('../../controllers/forumcontroller/forumPost');
const {
    postPost,
    putPost,
    deletePost,
    getPost,
    postComment,
    putComment,
    deleteComment,
    getComment,
} = require('../../controllers/forumcontroller/forumCRUD');
const {
    userComment,
} = require('../../controllers/forumcontroller/userComment');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './../frontend/public/postUpload');
    }
    // filename: (req, file, cb) => {
    //     cb(null, req.body.name);
    // },
});

const upload = multer({ storage });

// router.post('/upload', upload.single('image'), (req, res) => {
//     console.log(req)
//     res.status(200).json('File has been uploaded');
// });

router.get('/comment/:id', userComment);
router.get('/posts/:id', fetchPostDetail);
router.get('/post_category', fetchPostCategories);
router.get('/posts', forumPost);
router.get('/userpost/:id', fetchUserPost);

router.post('/posts', upload.single('image'), postPost);
router.put('/posts/:id', upload.single('image'), putPost);
console.log(putPost);
router.delete('/posts/:id', deletePost);

router.post('/comments', postComment);
router.put('/comment/:id', putComment);
router.delete('/comment/:id', deleteComment);

module.exports = router;
