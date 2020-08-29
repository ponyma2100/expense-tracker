const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id
  const category = req.query.filter
  if (category === 'all') {
    res.redirect('/')
  } else {
    return Record.find({ category, userId })
      .lean()
      .then((records) => {
        totalAmount = records.map(record => record.amount).reduce((acc, arr) => { return acc + arr }, 0)
        res.render('index', { records, category, totalAmount })
      })
      .catch(error => console.log(error))
  }
})

module.exports = router