const router = require('express').Router();
const bcrypt = require('bcrypt');
const multer = require('multer')
const fs = require('fs');
const addUser = require('../validation/validation')
const con = require('../dbconnection');
const hashPassword = require('../config/constant');
const userAuthentication = require('../auth/authentication');
const req = require('express/lib/request');
var Users = require('../models/users');
const { async } = require('regenerator-runtime');
const res = require('express/lib/response');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
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
    Users.count({ email: req.body.email }, async (err, count) => {
        if (count > 0) {
            return res.status(200).json({
                message: 'Already Registered'
            })
        } else {
            const hashingPassword = await hashPassword.cryptPassword(req.body.password)
            req.body.password = hashingPassword
            var newUser = new Users(req.body);
            newUser.save((err, user) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        err: err
                    })
                } else {
                    return res.json({
                        status: 'OK',
                        message: "Successfully Registered"
                    })
                }
            })
        }

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
router.post('/login', addUser.loginValidation, async (req, res, next) => {
    const email = req.body.email
    const userPassword = req.body.password;
    const userRecord = {}
    const result = await Users.find({
        email: req.body.email
    })
    if (result.length > 0) {
        const password = result[0].password
        var passwordCheck = bcrypt.compareSync(userPassword, password);
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
    } else {
        return res.status(200).json({
            status: 'FAILED',
            msg: 'Incorrect Username Or Password'
        })
    }
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

router.get('/list',userAuthentication.jwtTokenAuthenticate, async (req, res, next) => {
    const userList = await Users.find({}, 'id first_name last_name avatar', {
        projection: {
            _id: 0,
            password: 0,
            profile_type: false,
            __v: 0,
            status: 0
        }
    })
    userList.map((iitem, index) => {
        iitem.avatar = iitem?.avatar ? '/uploads' + iitem.avatar : 'null'
    })
    return res.status(200).json(
        userList
    )
});
router.get('/details/:id', userAuthentication.jwtTokenAuthenticate, async (req, res, next) => {
    console.log(req.params)
    if (req?.params?.id) {
        const userDetails = await Users.find(
            {
                id: req.params.id
            },
            'id first_name last_name avatar',
            {
                projection: {
                    _id: false,
                    password: 0,
                    profile_type: false,
                    __v: 0,
                    status: 0
                }
            }
        )
        userDetails.map((iitem,index)=>{
            iitem.avatar=iitem?.avatar ? '/uploads/'+iitem.avatar : 'null'
        })
        return res.status(200).json({
            userDetails  
        })
    } else {
        return res.status(200).json({
            message: 'Parameterised missmatch'
        })
    }

})
router.post('/send-request', (req, res, next) => {

})
router.post('/photo-upload', userAuthentication.jwtTokenAuthenticate, upload.single("profilephoto"), async (req, res, next) => {
    console.log("requsetdata");
    console.log(req.file);
    const userId = req.decode.id
    if (req.file) {
        const imageUpdate = await Users.updateOne(
            {
                id: userId
            },
            {
                $set: { avatar: req.file.originalname },

            }

        )
        if (imageUpdate.matchedCount == 1) {
            return res.status(200).json({
                message: 'Successfully Profile image is Updated'
            })
        }
        console.log({ imageUpdate })
    }

    console.log({ userId })
    const fileQuery = `SELECT profile_image FROM tbl_users WHERE id=${userId} `;
    // con.query(fileQuery, (err, imageData) => {
    //     if (imageData[0].profile_image != 'NULL') {
    //         const existFileName = imageData[0].profile_image
    //         try {
    //             if (fs.existsSync('./public/uploads/' + existFileName)) {
    //                 fs.unlinkSync('./public/uploads/' + existFileName);
    //             }

    //         } catch (error) {
    //         }

    //     }

    //     const sqlQuery = `UPDATE tbl_users SET profile_image='${req.file.filename}' WHERE id=${userId}`;
    //     con.query(sqlQuery, (err, data) => {
    //         if (req.file) {
    //             const path = hashPassword.base_url;
    //             return res.status(200).json({
    //                 imagepath: path + '/uploads/' + req.file.filename,
    //                 msg: 'Profile Photo Is uploaded'
    //             })
    //         }
    //     })
    // })

})
module.exports = router