const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Handlebars = require('handlebars')
const app = express()
const port = 3000
const routes = require('./routes')
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(routes)

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

Handlebars.registerHelper('getTotal', function (amount) {
  let totalAmount = amount.reduce(function (a, b) { return a + b.number; }, 0)
  return totalAmount
})

app.listen(port, (req, res) => {
  console.log(`Express is listening on http://localhost:${port}`)
})