const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const upload = require('../../middleware/multer')

// Get all products
router.get('/', async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        SubCategory : {
          select: {
            Product: {
              include: {
                ProductVariant: true,
              },
            },
          },
        },
      },
    })
    return res.json(categories)
  } catch (err) {
    next(err)
  }
})

module.exports = router
