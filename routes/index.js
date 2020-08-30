const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const filter = require('./modules/filter')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')


// 將網址結構符合 / 字串的 request 導向 home 模組
// 將網址結構符合 /records 字串開頭的 request 導向 records 模組
router.use('/records', authenticator, records)
router.use('/filter', authenticator, filter)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router