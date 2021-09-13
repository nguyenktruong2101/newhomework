var router = require('express').Router()
const { model } = require('mongoose')
var {userUpdate} = require('../../controllers/user-update-controller/user_update')
var validateAuth = require('../../middlewares/validateAuth')

router.put('/user/:id/update', userUpdate)



module.exports = router;