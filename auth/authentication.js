const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtTokenCreate = (userData) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY
    let userDetails = {
        time: Date(),
        userEmail: userData.email,
        id: userData.id
    }
    const token = jwt.sign(userDetails, jwtSecretKey)
    return token;
}
module.exports = {
    jwtTokenCreate: jwtTokenCreate
}