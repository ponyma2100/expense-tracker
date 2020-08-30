const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const db = require('../../config/mongoose')
const User = require('../../models/user')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

const data = [
  {
    name: '午餐',
    category: '餐飲食品',
    date: '2020-07-22',
    amount: 60
  },
  {
    name: '晚餐',
    category: '餐飲食品',
    date: '2020-09-22',
    amount: 60
  },
  {
    name: '捷運',
    category: '交通出行',
    date: '2020-08-22',
    amount: 120
  },
  {
    name: '電影:驚奇隊長',
    category: '休閒娛樂',
    date: '2020-09-22',
    amount: 220
  },
  {
    name: '租金',
    category: '家居物業',
    date: '2020-06-22',
    amount: 25000
  },
  {
    name: '買股票',
    category: '其他',
    date: '2020-08-22',
    amount: 50000
  }
]

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 6 },
        (_, i) => Record.create({
          name: data[i].name,
          category: data[i].category,
          date: data[i].date,
          amount: data[i].amount,
          userId
        })
      ))
    })
    .then(() => {
      console.log('data is build!')
      process.exit()
    })
})


// db.once('open', () => {
//   Record.create(
//     {
//       name: '午餐',
//       category: '餐飲食品',
//       date: '2020/8/5',
//       amount: 60
//     },
//     {
//       name: '晚餐',
//       category: '餐飲食品',
//       date: '2020/8/5',
//       amount: 60
//     },
//     {
//       name: '捷運',
//       category: '交通出行',
//       date: '2020/8/5',
//       amount: 120
//     },
//     {
//       name: '電影:驚奇隊長',
//       category: '休閒娛樂',
//       date: '2020/8/5',
//       amount: 220
//     },
//     {
//       name: '租金',
//       category: '家居物業',
//       date: '2020/8/5',
//       amount: 25000
//     },
//     {
//       name: '買股票',
//       category: '其他',
//       date: '2020/8/7',
//       amount: 50000
//     }
//   )
// })

