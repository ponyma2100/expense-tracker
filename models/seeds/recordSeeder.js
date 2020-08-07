const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  Record.create(
    {
      name: '午餐',
      category: '餐飲食品',
      date: '2020/8/5',
      amount: 60
    },
    {
      name: '晚餐',
      category: '餐飲食品',
      date: '2020/8/5',
      amount: 60
    },
    {
      name: '捷運',
      category: '交通出行',
      date: '2020/8/5',
      amount: 120
    },
    {
      name: '電影:驚奇隊長',
      category: '休閒娛樂',
      date: '2020/8/5',
      amount: 220
    },
    {
      name: '租金',
      category: '家居物業',
      date: '2020/8/5',
      amount: 25000
    }
  )
})

