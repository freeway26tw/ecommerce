const express = require('express')
const router = express.Router()

const loginRoute = require('../domains/login')
const productRoute = require('../domains/products')
const categoryRoute = require('../domains/categories')
const { apiErrorHandler } = require('../middleware/error-handler')

router.use('/category', categoryRoute)
router.use('/login', loginRoute)
router.use('/products', productRoute)
router.use('/', apiErrorHandler)

module.exports = router