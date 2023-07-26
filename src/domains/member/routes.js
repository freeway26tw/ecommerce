const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/order/pre', async (req, res, next) => {
  try {
    const address = prisma.userAddress.findMany({
      
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
