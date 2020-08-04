const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number
  }
})

module.exports = mongoose.model('Record', recordSchema)