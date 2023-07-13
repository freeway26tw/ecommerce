const express = require('express')
const router = express.Router()
const passport = require('passport')

const users = require('./modules/users')

const { apiErrorHandler } = require('../middleware/error-handler')
const { authenticated } = require('../middleware/auth')

router.use('/users', users)
router.use('/', apiErrorHandler)

module.exports = router