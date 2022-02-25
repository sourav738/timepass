const req = require('express/lib/request')
const res = require('express/lib/response')

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

router.use('/logout',(req,res,next)=>{
  console.log("Logout page")  
})
module.exports = router