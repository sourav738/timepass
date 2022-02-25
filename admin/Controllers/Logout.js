const router = require('express').Router()
router.get('/', (req, res, next) => {
    console.log("logout")
    res.clearCookie('userData');
    res.redirect('/admin/login')
})
module.exports = router;