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
    newProduct.map((e) => e.mainPictures = JSON.parse(e.mainPictures))
    res.json({
      code: 1,
      msg: 'Success',
      result: newProduct,
    })
  } catch (error) {
    next(error)
  }
})

router.get('/hot', async (req, res, next) => {
  try {
    const hotProduct = await prisma.productVariant.findMany({
      take: 10,
      orderBy: {
        OrderDetail: {
          _count: 'desc',
        },
      },
    })
    hotProduct.map((e) => (e.mainPictures = JSON.parse(e.mainPictures)))
    res.json({
      code: 1,
      msg: 'Success',
      result: hotProduct,
    })
  } catch (error) {
    next(error)
  }
})

router.get('/category/head', async (req, res, next) => {
  try {
        const categories = await prisma.category.findMany({
          include: {
            SubCategory: {
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
    res.json({
      code: 1,
      msg: 'Success',
      result: categories,
    })
  } catch (error) {
    next(error)
  }
})

router.get('/banner', async (req, res, next) => {
  try {
    const homeBanner = await prisma.category.findMany({})
    homeBanner.map((banner) => (banner.type = '1'))
    res.json({
      code: 1,
      msg: 'Success',
      result: homeBanner,
    })
  } catch (error) {
    next(error)
  }
})

router.get('/goods', async (req, res, next) => {
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
