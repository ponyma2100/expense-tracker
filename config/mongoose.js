if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose') // 載入mongoose
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'
// set connection to mongedb
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb conneted!')
})

module.exports = db