const router = require('express').Router();
const addUser = require('../validation/validation')
router.get('/', (req, res, next) => {
    res.send('hello');
})

router.post('/', addUser.addUser, (req, res, next) => {
    res.json({ success: 'ok' })
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