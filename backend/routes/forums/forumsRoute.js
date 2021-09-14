const router = require('express').Router();
const mongoose = require('mongoose');
const crypto = require("crypto");
const path = require("path");
const multer = require('multer');
const GridFsStorage = require("multer-gridfs-storage");
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

let gfs;
mongoose.connection.once('open', () => {
    // init gfs
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'upload'
    });
});

// Storage
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({
  storage
});

router.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json({ msg: 'File has been uploaded' });
});

router.post("files/del/:id", (req, res) => {
    gfs.delete(new mongoose.Types.ObjectId(req.params.id), (error, data) => {
        if (err) return res.status(404).json({ error: error.message })
        res.status(200).json({ msg: "Deleted file!" });
    });
});

router.get('/comment/:id', userComment);
router.get('/posts/:id', fetchPostDetail);
router.get('/post_category', fetchPostCategories);
router.get('/posts', forumPost);
router.get('/userpost/:id', fetchUserPost);

router.post('/posts', postPost);
router.put('/posts/:id', putPost);
router.delete('/posts/:id', deletePost);

router.post('/comments', postComment);
router.put('/comment/:id', putComment);
router.delete('/comment/:id', deleteComment);

module.exports = router;
