const express = require('express')
const router = express.Router()
const createError = require('http-errors')

const loginRoute = require('../domains/login')
const productRoute = require('../domains/products')
const categoryRoute = require('../domains/categories')
const goodsRoute = require('../domains/goods')
const memberRoute = require('../domains/member')
const homeRoute = require('../domains/home')
const { apiErrorHandler } = require('../middleware/error-handler')
const passport = require('../config/passport')

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) next(err)
    if (!user) throw createError(401, 'Your token is invalid.')
    req.user = user
    return next()
  })(req, res, next)
}

router.use('/login', loginRoute)

// router.use(authenticate)
router.use('/goods', goodsRoute)
router.use('/member', memberRoute)
router.use('/category', categoryRoute)
router.use('/home', homeRoute)
router.use('/products', productRoute)
router.use('/', apiErrorHandler)

module.exports = router