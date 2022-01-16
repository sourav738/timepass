import express from "express";
const app=express();
require('dotenv').config();
const dbConnect=require('./dbconnection')

const apiRoutes=require('./Routes/index')
app.use('/api',apiRoutes)
app.listen(process.env.PORT || 5000,()=>{
    console.log('sertver is connected');
})