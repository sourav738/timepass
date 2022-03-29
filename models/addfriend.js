const mongoose = require('mongoose')
var bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
const { array } = require('joi');
var addFriendSchema = mongoose.Schema({
    id: {
        type: String,
        default: () => { return uuidv4() },
        unique: null
    },
    requestrelation: {
        type: array,
        required: true
    },
    sender_id: {
        type: String,
        required: true
    },
    reciever_id: {
        type: String,
        required: true
    },
    is_accepted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

})
module.exports=mongoose.model("addFriend",addFriendSchema)