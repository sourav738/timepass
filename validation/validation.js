const { check, validationResult } = require('express-validator');
const addUser = (req, res, next) => {
    req.body('first_name').notEmpty()();
    const errors = validationResult(req)
    console.log({errors});
}
module.exports = {
    addUser: addUser
}