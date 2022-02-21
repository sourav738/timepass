const router = require('express').Router();
const userController = require('../Controller/User')
const userSendInvite = require('../Controller/inviteCode')
const transport = require('../Controller/transport')
router.use('/users', userController)
router.use('/invite-friend',userSendInvite)
router.use('/transport',transport)
module.exports = router
// import express from "express";
// const app=express();
// const userController=require('../Controller/User')
// app.use('/api',userController)