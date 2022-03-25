var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
var UserSchema = mongoose.Schema({
  id: {
    type: String,
    default: () => { return uuidv4() },
    unique: null
  },
  first_name: {
    type: String,
    required: true
  },
  middle_name: {
    type: String,
    required: false
  },
  last_name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: null
  },
  avatar: {
    type: String,
    default: null
  },
  phone_no: {
    type: String,
    default: null,
  },
  status:{
    type:Boolean,
    default:true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  profile_type:{
    type:Number,
    default:2
  }
});

// var User = module.exports = mongoose.model("User", UserSchema);
module.exports = mongoose.model("Users", UserSchema)
