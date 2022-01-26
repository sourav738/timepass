const router = require('express').Router();
const bcrypt = require('bcrypt');
const addUser = require('../validation/validation')
const con = require('../dbconnection');
const hashPassword = require('../config/constant');
const res = require('express/lib/response');
router.get('/', (req, res, next) => {
    res.send('hello');
})

router.post('/', addUser.addUser, async (req, res, next) => {
    const password = req.body.password
    const hashingPassword = await hashPassword.cryptPassword(password)
    console.log({ hashingPassword });
    const first_name = req.body.first_name
    const last_name = req.body.last_name;
    let middle_name = "";
    if (req.body.middle_name) {
        middle_name = req.body.middle_name;
    }
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const emailExist = `SELECT * FROM users WHERE email='${email}'`
    console.log({ emailExist })
    con.query(emailExist, function (err, result) {
        console.log({ result });
        if (result.length > 0) {
            return res.status(200).json({
                success: 'OK', message: 'Email is Already Taken.'
            })
        } else {
            const userInsertQuery = `INSERT INTO users (first_name,middle_name,last_name,email,password,phone_no) VALUES('${first_name}','${middle_name}','${last_name}','${email}','${hashingPassword}',${phone_no})`
            con.query(userInsertQuery, function (err, result) {
                if (err) throw err;
                return res.status(200).json({
                    success: 'OK', message: 'Successfully Registered'
                })
            });
        }

    })
})

router.put('/', (req, res, next) => {
    res.json({ success: 'ok put request is working' })
})

router.patch('/', (req, res, next) => {
    res.json({ success: 'ok patch request is working' })
})

router.delete('/', (req, res, next) => {
    res.json({ success: 'ok delete request is working' })
})
router.post('/login', addUser.loginValidation, (req, res, next) => {
    const email = req.body.email
    const userPassword = req.body.password;
    const fetchUserDetails = `SELECT * FROM users WHERE email='${email}'`;
    con.query(fetchUserDetails, (err, result) => {
        if (result.length > 0) {
            const password = result[0].password
            try {
                var passwordCheck = bcrypt.compareSync(userPassword, password);

            } catch (error) {
                console.log({ error });
            }

        } else {
            return res.status(400).json({
                success: 'OK',
                msg: 'Incorrect Username Or Password'
            })
        }
    })

})
module.exports = router