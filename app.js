const Record = require('./models/record')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
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

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
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

app.post('/records/:id/edit', (req, res) => {
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



app.listen(port, (req, res) => {
  console.log(`Express is listening on http://localhost:${port}`)
})