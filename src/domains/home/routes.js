const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/new', async (req, res, next) => {
  try {
    const newProduct = await prisma.productVariant.findMany({
      take: 4,
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    })
    res.json({
      code: 1,
      msg: 'Success',
      result: newProduct
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
