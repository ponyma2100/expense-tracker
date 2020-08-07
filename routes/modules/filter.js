const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const category = req.query.filter
  // console.log(category)
  return Record.find({ category: category })
    .lean()
    .then((records) => {
      const totalAmount = records.map(record => record.amount).reduce((acc, arr) => { return acc + arr })
      res.render('index', { records, category, totalAmount })
    })
    .catch(error => console.log(error))
})


module.exports = router