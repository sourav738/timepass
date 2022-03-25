const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
var SendRequestSchema = mongoose.Schema({
    id: {
        type: String,
        default: () => { return uuidv4() },
        unique: null
    },
    isaccepted:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model('sendrequest',SendRequestSchema)