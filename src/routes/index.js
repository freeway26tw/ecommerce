const express = require('express')
const router = express.Router()

const loginRoute = require('../domains/login')
const productRoute = require('../domains/products')
const categoryRoute = require('../domains/categories')
const goodsRoute = require('../domains/goods')
const homeRoute = require('../domains/home')
const { apiErrorHandler } = require('../middleware/error-handler')

router.use('/login', loginRoute)

router.use('/goods', goodsRoute)
router.use('/category', categoryRoute)
router.use('/home', homeRoute)
router.use('/products', productRoute)
router.use('/', apiErrorHandler)

module.exports = router