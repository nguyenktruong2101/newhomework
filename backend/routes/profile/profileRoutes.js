var router = require('express').Router()
var {profile, getAllUsers, searchByUsername} = require('../../controllers/forumcontroller/userProfile')

router.get("/profiledetails/:id", profile)
router.get("/allusers", getAllUsers)
router.get("/search/:keyword", searchByUsername)
module.exports = router;