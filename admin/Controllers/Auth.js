const req = require('express/lib/request');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const router = require('express').Router()
const Users = require('../../models/users')
const userAuthentication = require('../../auth/authentication')
var cookieParser = require('cookie-parser');
const login = ((req, res, next) => {

})
router.get('/', (req, res, next) => {
   
    if (req.cookies.userData) {
        if (req.cookies.userData.isloggedin) {
            console.log("success page")
            res.redirect('/admin/home')
        }
    } else {
        res.render('login', { Authentication: 'undefined' })
    }
});
router.post('/', [
    check('password', 'This password must me 8+ characters long')
        .isLength({ min: 8 }),
    check('useremail', 'Email is not valid')
        .isEmail()
], async (req, res, next) => {
    const userRecord = {}
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const alert = errors.array()
        console.log({ alert })
        res.render('login', { alert, Authentication: 'undefined' })
    } else {
        const result = await Users.find({
            email: req.body.useremail
        })
        if (result.length > 0) {
            const password = result[0].password
            const userPassword = req.body.password
            var passwordCheck = bcrypt.compareSync(userPassword, password);
            const jwtToken = userAuthentication.jwtTokenCreate(result[0]);
            userRecord.id = result[0].id
            userRecord.email = result[0].email
            userRecord.uniqueCode = result[0].unique_code
            userRecord.token = jwtToken
            userRecord.isloggedin = true
            res.cookie("userData", userRecord);
            res.redirect('/admin/home')
        } else {
            res.render('login', { Authentication: 'Incorrect Username or Password' })
        }
    }
})


module.exports = router;