var router = require('express').Router()
var User = require('../../models/users').user
var Token = require('../../models/resetToken').resetToken;
router.get("/user/password-reset/:id/:token", async function (req, res) {
  const user = await User.findOne({ _id: req.params.id })
  if (!user) return res.status(400).send({ canReset: false });
  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!token) return res.status(400).send({ canReset: false });
  return res.send({canReset: true})
})
module.exports = router