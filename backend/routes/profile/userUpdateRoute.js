var router = require('express').Router()
const { model } = require('mongoose')
var {userUpdate, updateAvatar, changePassword} = require('../../controllers/user-update-controller/user_update')
var validateAuth = require('../../middlewares/validateAuth')

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../frontend/public/userUploads')
    }
})


var upload = multer({
    storage
});

router.put('/user/:id/update', userUpdate)
router.put('/user/:id/changepassword', changePassword)
router.put('/user/:id/imageupdate', upload.single('image'), updateAvatar)



module.exports = router;