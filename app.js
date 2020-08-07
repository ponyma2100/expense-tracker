const Record = require('./models/record')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Handlebars = require('handlebars')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const record = require('./models/record')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb conneted!')
})



app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

Handlebars.registerHelper('setSelected', function (value, currentValue) {
  if (value === currentValue) {
    return 'selected'
  } else {
    return ''
  }
})

Handlebars.registerHelper('setIcon', function (category) {
  if (category === '家居物業') {
    return '<i class="fa fa-home"></i>'
  } else if (category === '交通出行') {
    return '<i class="fa fa-bus"></i>'
  } else if (category === '休閒娛樂') {
    return '<i class="fa fa-gamepad"></i>'
  } else if (category === '餐飲食品') {
    return '<i class="fa fa-coffee"></i>'
  } else {
    return '<i class="fa fa-surprise"></i>'
  }
})

// Handlebars.registerHelper('getTotal', function (amount) {
//   var total = fruits.reduce(function (a, b) { return a + b.number; }, 0);
//   return total;
//   }
// })

Handlebars.registerHelper('getTotal', function (amount) {
  let totalAmount = amount.reduce(function (a, b) { return a + b.number; }, 0)
  return totalAmount
})



app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      const totalAmount = records.map(record => record.amount).reduce((acc, arr) => { return acc + arr })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

app.get('/records/new', (req, res) => {
  return res.render('new')
})

app.post('/records', (req, res) => {
  const { name, category, date, amount } = req.body
  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const { name, category, date, amount } = req.body
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.category = category
      record.date = date
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/filter', (req, res) => {
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

app.listen(port, (req, res) => {
  console.log(`Express is listening on http://localhost:${port}`)
})