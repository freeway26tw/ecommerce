const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/order/pre', async (req, res, next) => {
  try {
    const address = await prisma.userAddress.findMany({})
    address.map((e) => {
      e.fullLocation = [...e.city, ...e.address2].join('')
      e.address = e.address1
    })
    res.json({
      code: 1,
      msg: 'Success',
      result: address,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
