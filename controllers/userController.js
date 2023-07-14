const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const userController = {
  signUp: async (req, res, next) => {
    const { email, password, account, name } = req.body

    if (password !== req.body.checkPassword)
      throw createError(400, 'Passwords do not match!')

    return await prisma.User.findUnique({
      where: { account },
    })
      .then((user) => {
        if (user)
          throw createError(409, 'This account/email is already registered')
        return bcrypt.hash(password, 10)
      })
      .then(async (hash) => {
        return await prisma.User.create({
          data: {
            email,
            account,
            password: hash,
            name,
            type: 'User',
          },
        })
      })
      .then((newUser) => {
        delete newUser.password
        console.log(newUser)
        return res.json(newUser)
      })
      .catch((error) => next(error))
  },
  signIn: (req, res, next) => {
    try {
      console.log(req.user)
      const { password, ...userData } = req.user
      if (userData.type !== 'User')
        throw createError(403, 'Access to the requested resource is forbidden')
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: '30d',
      })
      res.json({
        token,
        user: userData,
      })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = userController
