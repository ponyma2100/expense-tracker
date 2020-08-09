const express = require('express')
const router = express.Router()
// 載入 Record model
const Record = require('../../models/record')
// 定義首頁路由
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      const totalAmount = records.map(record => record.amount).reduce((acc, arr) => { return acc + arr }, 0)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})
// 匯出路由模組
module.exports = router



