if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const session = require('express-session')
const userPassport = require('./config/passport')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Handlebars = require('handlebars')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const { use } = require('passport')
const flash = require('connect-flash')
require('./config/mongoose')



app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

userPassport(app)

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

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
  } else if (category === '其他') {
    return '<i class="fa fa-rocket"></i>'
  }
})

Handlebars.registerHelper('getTotal', function (amount) {
  let totalAmount = amount.reduce(function (a, b) { return a + b.number; }, 0)
  return totalAmount
})

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`Express is listening on http://localhost:${process.env.PORT || 3000}`)
})