const router=require('express').Router()
const Auth = require('./Controllers/Auth')
const Home = require('./Controllers/Home')
const Logout=require('./Controllers/Logout')
router.use('/login',Auth)
router.use('/home',Home)
router.use('/logout',Logout)
module.exports=router