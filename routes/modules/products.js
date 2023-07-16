const express = require('express')
const router = express.Router()
const productController = require('../../controllers/productController')
const upload = require('../../middleware/multer')

router.get('/', productController.getProducts)
router.get('/:productId', productController.getProduct)
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }]), productController.postProducts)

module.exports = router
