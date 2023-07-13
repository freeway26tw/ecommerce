const express = require('express')
const router = express.Router()
const passport = require('passport')

const users = require('./modules/users')

router.use('/users', users)

module.exports = router