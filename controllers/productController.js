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
}

module.exports = productController
