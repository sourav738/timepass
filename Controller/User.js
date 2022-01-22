const router = require('express').Router();
const addUser = require('../validation/validation')
const con = require('../dbconnection');
router.get('/', (req, res, next) => {
    res.send('hello');
})

router.post('/', addUser.addUser, (req, res, next) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name;
    let middle_name = "";
    if (req.body.middle_name) {
        middle_name = req.body.middle_name;
    }
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const userInsertQuery = `INSERT INTO users (first_name,middle_name,last_name,email,password,phone_no) VALUES('${first_name}','${middle_name}','${last_name}','${email}','123456',${phone_no})`
    con.query(userInsertQuery, function (err, result) {
        if (err) throw err;
        return res.status(200).json({
            success: 'OK', message: 'Successfully Registered'
        })
    });

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
module.exports = router