var router = require('express').Router()
var {profile, getAllUsers} = require('../../controllers/forumcontroller/userProfile')

router.get("/profiledetails/:id", profile)
router.get("/allusers", getAllUsers)
module.exports = router;