const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get(
  '/new',
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
