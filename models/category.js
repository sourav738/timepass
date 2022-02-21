var mongoose = require('mongoose')
var bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
var categorySchema = mongose.Schema({
    id:{
        type:String,
        default: () => { return uuidv4() },
        unique: null
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Category',categorySchema)