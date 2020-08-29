const passport = require('passport')
const user = require('../models/user')
const LocalStratrgy = require('passport-local').Strategy

module.exports = app => {
  app.use([passport.initialize()])

  app.use(passport.session())

  passport.use(new LocalStratrgy({ usernameField: 'email' }, (email, password, done) => {
    user.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'This email is not registered' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Email or Password incorrect' })
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    user.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })

}