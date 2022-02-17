var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require('uuid');

var UserSchema = mongoose.Schema({
  id: {
    type: String,
    default: () => { return uuidv4() },
    unique: null
  },
  email: {
    type: String,
    
    required: null
  },
  password: {
    type: String,
    required: null
  },

  avatar: {
    type: String,
    default: null
  },
  
  phone_number: {
    type: String,
    default: null,
  },

  created_at: {
    type: Date,
    default: Date.now
  },
});

// var User = module.exports = mongoose.model("User", UserSchema);
module.exports = mongoose.model("Users", UserSchema)
