const bcrypt = require('bcrypt');
const res = require('express/lib/response');
const salt = 'myapp'
const cryptPassword = async (password) => {
  let hash = bcrypt.hashSync(password, 10);
  return hash
}
const comparePassword = (plainPass, hashword, callback) => {
  bcrypt.genSalt(10, function (err, salt) {
    if (err)
      return callback(err);

    bcrypt.hash(password, salt, function (err, hash) {
      return callback(err, hash);
    });
  });
}

const randomCode = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


module.exports = {
  cryptPassword: cryptPassword,
  comparePassword: comparePassword,
  randomCode:randomCode,
  base_url:'http://localhost:8000'
}