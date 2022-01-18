import express from "express";
const app = express();
const multer=require('multer');
var upload = multer();
app.use(upload.array())
require('dotenv').config();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
const dbConnect = require('./dbconnection')
const apiRoutes = require('./Routes/index')
app.use('/api', apiRoutes)
app.listen(process.env.PORT || 5000, () => {
    console.log('sertver is connected');
})