const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  try {
    const goods = await prisma.productVariant.findMany({})
    res.json({
      code: 1,
      msg: 'Success',
      result: goods,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
