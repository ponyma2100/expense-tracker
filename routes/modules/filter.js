const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const moment = require('moment')


router.get('/', (req, res) => {
  const userId = req.user._id
  const category = req.query.category
  const selectMonth = req.query.months
  let allList = {}

  if (category) {
    allList = { category, date: { $regex: selectMonth } }
  }

  const getCategory = new Promise((resolve, reject) => {
    const categoryList = []
    Category.find()
      .lean()
      .sort({ _id: 'asc' })
      .then(categories => {
        categories.forEach(category => {
          categoryList.push({ name: category.categoryName })
          // console.log(category.categoryName)
        })
      })
    return resolve(categoryList)
  })

  const getMonth = new Promise((resolve, reject) => {
    const monthList = []

    Record.find({ userId })
      .lean()
      .then(records => {
        records.forEach(record => {
          const month = record.date.substr(0, 7)
          if (!monthList.includes(month)) {
            monthList.push(month)
            // console.log(monthList)
          }
        })
      })
    return resolve(monthList)
  })

  Promise.all([getCategory, getMonth])
    .then(data => {
      const [categoryList, monthList] = data
      Record.find(allList)
        .lean()
        .then(records => {
          if (category === 'all') {
            res.redirect('/')
          } else {
            // console.log(records)
            totalAmount = records.map(record => record.amount).reduce((acc, arr) => { return acc + arr }, 0)

            res.render('index', { records, category, categoryList, totalAmount, selectMonth, monthList })

          }
          // console.log(selectMonth)
        })
        .catch(error => console.log(error))
    })

})




module.exports = router
