const router = require('express').Router();
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/transportcategory')
    },
    filename: function (req, file, cb) {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })
router.post('/', (req, res, next) => {
    return res.status(200).json({
        msg: 'OK'
    })
})

router.post('/category-add', upload.single("categoryimage"), (req, res, next) => {
    console.log(req.file);
    return res.status(200).json({
        msg: 'Add Category'
    })
})
module.exports = router