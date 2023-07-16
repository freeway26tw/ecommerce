const createError = require('http-errors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const productController = {
  getProducts: async (req, res, next) => {
    try {
      const products = await prisma.product.findMany()
      return res.json(products)
    } catch (err) {
      next(err)
    }
  }, 
  getProduct: async (req, res, next) => {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: req.params.productId
        }
      })
      return res.json(product)
    } catch(err) {
      next(err)
    }
  },
  postProducts: async (req, res, next) => {
    try {
      const { sellerId, name, category, price, active } = req.body
      const { files } = req
      const newProduct = await prisma.product.create({
        data: {
          sellerId,
          name,
          category,
          price,
          active: Boolean(active),
          image: files.image[0].path,
        },
      })
      return res.json(newProduct)
    } catch (err) {
      next(err)
    }
  },
}

module.exports = productController
