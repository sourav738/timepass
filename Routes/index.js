const router=require('express').Router();
const userController=require('../Controller/User')
router.use('/users',userController)
module.exports=router
// import express from "express";

// const app=express();
// const userController=require('../Controller/User')
// app.use('/api',userController)