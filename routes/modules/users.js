const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmpassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmpassword) {
    errors.push({ message: '請填寫必填欄位' })
  }
  if (password !== confirmpassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmpassword
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exist')
      errors.push({ message: '這個 Email 已經註冊過' })
      res.render('register', {
        name,
        email,
        password,
        confirmpassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '已成功登出!')
  res.redirect('/users/login')
})


module.exports = router