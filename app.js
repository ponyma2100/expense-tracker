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

app.listen(port, (req, res) => {
  console.log(`Express is listening on http://localhost:${port}`)
})