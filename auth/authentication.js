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

const jwtTokenValidate = (req) => {
    const token = req.header('token');
    const jwtSecretKey = process.env.JWT_SECRET_KEY
    try {
        const decode = jwt.verify(token, jwtSecretKey)
        return decode;
    } catch (err) {
        return false;
    }
}
module.exports = {
    jwtTokenCreate: jwtTokenCreate,
    jwtTokenValidate: jwtTokenValidate
}