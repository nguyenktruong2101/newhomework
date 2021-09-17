var News = require('../../models/news').news;
var { uploadFile, deleteFile } = require('../s3')

const bucketName = "covi-away-app/newsUploads"

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


exports.addArticle =function (req, res) {
    const file = req.file
    console.log(file)
    News.create({
        title: req.body.title,
        content: req.body.content,
        breaking: req.body.breaking,
        image: 'newsUploads/' + req.file.filename + '.' + req.file.mimetype.split('/')[1],
        news_category_id: req.body.news_category_id,
        user_id: req.body.user_id
    }, async function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            const result = await uploadFile(file, bucketName)
            console.log(result)
            res.send(result)
        }
    })

}

exports.deleteArticle = function (req, res) {
    News.findOneAndDelete({ _id: req.body._id }, function (err, result) {
        res.send(result)

        deleteFile(result.image, bucketName)
    })
}

exports.updateArticle = function (req, res) {
    //Find current image and remove it from the source folder
    if (req.file) {
        News.findOne({ _id: req.body.id }, (err, result) => {
            console.log(result)
            if (result) {
                deleteFile(result.image, bucketName)
                News.findOneAndUpdate({ _id: result._id }, {
                    title: req.body.title,
                    content: req.body.content,
                    breaking: req.body.breaking,
                    image: 'newsUploads/' + req.file.filename + '.' + req.file.mimetype.split('/')[1],
                    news_category_id: req.body.news_category_id,
                }
                    , async function (err, result) {
                        if (err) {
                            console.log(err)
                        } if (result) {
                            const s3Result = await uploadFile(req.file, bucketName)
                            console.log(s3Result)
                            res.send(result)
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
                    res.send(result)
                }
            })
    }
}