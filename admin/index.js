const router=require('express').Router()
const Auth = require('./Controllers/Auth')
router.use('/login',Auth)
module.exports=router