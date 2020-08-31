if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../models/user')
const LocalStratrgy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = app => {
  app.use([passport.initialize()])

  app.use(passport.session())

  passport.use(
    new LocalStratrgy(
      {
        usernameField: 'email',
        passportField: 'password',
        passReqToCallback: true, // 如果需要在 verify callback 中取得 req
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email })
          if (!user) {
            return done(null, false,
              req.flash('warning_msg', '帳號未註冊'))
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, req.flash('warning_msg', '帳號或密碼錯誤'))
          }
          return done(null, user, req.flash('success_msg', '登入成功'))
        } catch (error) {
          return done(err, false)
        }
      }))



  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })

}