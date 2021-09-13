var News = require('../../models/news').news;

// var multer = require('multer')

// var path = require('path')

//Image uploader
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../../uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)))
//     }
// })

// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//       if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//         cb(null, true);
//       } else {
//         cb(null, false);
//         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//       }
//     }
//   }).single('image');

const fs = require('fs')


exports.getArticle = function (req, res) {
    News.find({}, (err, result) => {
        res.send(result)
    })
}

exports.getArticleDetails = function (req, res) {
    News.findById(req.params.id, (err, result) => {
        res.send(result)
    })
}


exports.addArticle = function (req, res) {

    // console.log(req)
    // console.log(req.file)
    // console.log(req.image)
    News.create({
        title: req.body.title,
        content: req.body.content,
        breaking: req.body.breaking,
        image: req.file.filename,
        news_category_id: req.body.news_category_id,
        user_id: req.body.user_id
    }, function (err, result) {

        res.send(result)

    })

}

exports.deleteArticle = function (req, res) {
    News.findOneAndDelete({ _id: req.body._id }, function (err, result) {
        res.send(result)
        // console.log(result)
        fs.unlink('./../frontend/public/newsUploads/' + result.image, (err) => {
            if (err) {
                console.error(err)
                return
            }

            //file removed
        })
    })
}

exports.updateArticle = function (req, res) {
    //Find current image and remove it from the source folder
    if (req.file) {
        News.findOne({ _id: req.body.id }, (err, result) => {
            console.log(result)
            if (result) {
                fs.unlink('./../frontend/public/newsUploads/' + result.image, (err) => {
                    if (err) {
                        console.error(err)
                        // return
                    }
                    //file removed
                })
                News.findOneAndUpdate({ _id: result._id }, {
                    title: req.body.title,
                    content: req.body.content,
                    breaking: req.body.breaking,
                    image: req.file.filename,
                    news_category_id: req.body.news_category_id,
                }
                    , function (err, result) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(result)
                        }
                    })
            }
        })
    } else {
        News.findOneAndUpdate({ _id: req.body.id }, {
            title: req.body.title,
            content: req.body.content,
            breaking: req.body.breaking,
            news_category_id: req.body.news_category_id,
        }
            , function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)
                }
            })
    }
}