const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
  try {
    const good = await prisma.productVariant.findUnique({
      where: {
        id: req.query.id
      }
    })
    good.mainPictures = JSON.parse(good.mainPictures)
    res.json({
      code: 1,
      msg: 'Success',
      result: good,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
