const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, date, amount, shopname } = req.body
  const reg = /^[0-9]+.?[0-9]*$/
  const alert = `請輸入數字!`
  if (!reg.test(amount)) {
    return res.render('new', {
      errors,
      alert,
      name,
      category,
      date,
      amount,
      shopname
    })

  } else {
    return Record.create({ name, category, date, amount, shopname, userId })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  }
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, date, amount, shopname } = req.body
  const reg = /^[0-9]+.?[0-9]*$/
  const alert = `請輸入數字!`
  if (!reg.test(amount)) {
    return res.render('edit', { alert, name, category, date, amount, shopname, userId })
  } else {
    return Record.findOne({ _id, userId })
      .then(record => {
        record.name = name
        record.category = category
        record.date = date
        record.amount = amount
        record.shopname = shopname
        return record.save()
      })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  }
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router