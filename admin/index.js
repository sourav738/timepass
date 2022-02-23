const router=require('express').Router()
const Auth = require('./Controllers/Auth')
const Home = require('./Controllers/Home')
router.use('/login',Auth)
router.use('/home',Home)
module.exports=router