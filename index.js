const express = require('express');
const app = express();
const path = require('path');
var upload = require('multer');
// app.use(upload.array())
require('dotenv').config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')));
// express.static(path.join(__dirnam//e, '/public'));
//console.log("directory", __dirname)
const dbConnect = require('./dbconnection')
const apiRoutes = require('./Routes/index')
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, * ");
    next();
})
app.use('/api', apiRoutes)
app.listen(process.env.PORT || 5000, () => {
    console.log('sertver is connected');
})