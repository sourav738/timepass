const router = require('express').Router()
router.get('/', (req, res, next) => {
    if (req.cookies.userData) {
        if (req.cookies.userData.isloggedin) {
            console.log("success page")
            res.render('home')
        }
    } else {
        res.redirect('/admin/login')
    }
})
module.exports = router