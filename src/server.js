if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const routes = require('./routes')
const passport = require('./config/passport')

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
// For accepting json data
app.use(express.json())
// For accepting post form data
app.use(express.urlencoded({ extended: true }))
// Registering routes
app.use('/api', routes)

module.exports = app
