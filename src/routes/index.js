const express = require('express')
const router = express.Router()

const userRoute = require('../domains/users')
const productRoute = require('../domains/products')
const categoryRoute = require('../domains/categories')
const { apiErrorHandler } = require('../middleware/error-handler')

router.use('/category', categoryRoute)
router.use('/users', userRoute)
router.use('/products', productRoute)
router.use('/', apiErrorHandler)

module.exports = router