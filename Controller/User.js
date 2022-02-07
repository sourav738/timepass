const router = require('express').Router();
const bcrypt = require('bcrypt');
const multer  = require('multer')
const addUser = require('../validation/validation')
const con = require('../dbconnection');
const hashPassword = require('../config/constant');
const userAuthentication = require('../auth/authentication');
const req = require('express/lib/request');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })
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
    const randomCode = await hashPassword.randomCode(6)
    const emailExist = `SELECT * FROM tbl_users WHERE email='${email}'`
    console.log({ emailExist })
    con.query(emailExist, function (err, result) {
        console.log({ result });
        if (result.length > 0) {
            return res.status(200).json({
                success: 'OK', message: 'Email is Already Taken.'
            })
        } else {
            const userInsertQuery = `INSERT INTO tbl_users (first_name,middle_name,last_name,email,password,phone_no,unique_code) VALUES('${first_name}','${middle_name}','${last_name}','${email}','${hashingPassword}',${phone_no},'${randomCode}')`
            console.log({ userInsertQuery });
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
    const userRecord = {}
    const fetchUserDetails = `SELECT * FROM tbl_users WHERE email='${email}'`;
    con.query(fetchUserDetails, (err, result) => {
        if (result.length > 0) {
            const password = result[0].password
            try {
                var passwordCheck = bcrypt.compareSync(userPassword, password);
                if (passwordCheck) {
                    const jwtToken = userAuthentication.jwtTokenCreate(result[0]);
                    userRecord.id = result[0].id
                    userRecord.email = result[0].email
                    userRecord.uniqueCode = result[0].unique_code
                    userRecord.token = jwtToken
                    return res.status(200).json({
                        status: 'OK',
                        msg: 'Successfully Loggedin',
                        data: userRecord
                    })
                }
            } catch (error) {
                console.log({ error });
            }

        } else {
            return res.status(200).json({
                status: 'FAILED',
                msg: 'Incorrect Username Or Password'
            })
        }
    })

})

router.get('/get-code', async (req, res, next) => {
    const token = userAuthentication.jwtTokenValidate(req)
    if (token) {
        const user_id = token.id;
        const userData = `SELECT unique_code FROM tbl_users WHERE id=${user_id}`
        const uniqueCode = con.query(userData, (err, data) => {
            const uniqueCCode = data[0].unique_code;
            return res.status(200).json({
                status: 'OK',
                code: uniqueCCode
            })
        })
    } else {
        return res.status(403).json({
            msg: 'Access Forbidden'
        })
    }
})

router.post('/photo-upload', async (req, res, next) => {

})
module.exports = router