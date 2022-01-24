const bcrypt=require('bcrypt');
const cryptPassword= (password, callback) =>{
    bcrypt.genSalt(10, function(err, salt) {
        if (err) 
          return callback(err);
    
        bcrypt.hash(password, salt, function(err, hash) {
          return callback(err, hash);
        });
      });
 }

 const comparePassword = (plainPass, hashword, callback) =>{
    bcrypt.genSalt(10, function(err, salt) {
        if (err) 
          return callback(err);
    
        bcrypt.hash(password, salt, function(err, hash) {
          return callback(err, hash);
        });
      });
 }
 module.exports={
    cryptPassword:cryptPassword,
    comparePassword :comparePassword  
 }