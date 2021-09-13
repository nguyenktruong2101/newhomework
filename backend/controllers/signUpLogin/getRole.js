exports.publicAccess = (req, res) => {
    res.send({isPublic: true})
}
exports.userAccess = (req, res) => {
    res.send({isUser: true})
}
exports.reporterAccess = (req, res) => {
    res.send({isReporter: true})
}
exports.adminAccess = (req, res) => {
    res.send({isAdmin: true})
}