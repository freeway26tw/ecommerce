if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const session = require('express-session')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 3000
const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(cors())
// app.use(passport.initialize())
// app.use(passport.session())

app.use('/api', routes)

app.listen(port, () =>
  console.log(`Server is listening on port ${port}!
Press CTRL + C to stop the process.`)
)
