const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const userController = {
  signUp: async (req, res, next) => {
    try {
      const { email, password, account, name } = req.body
      if (password !== req.body.checkPassword)
        throw createError(400, 'Passwords do not match!')

      const user = await prisma.User.findUnique({
        where: { account },
      })
      if (user) {
        throw createError(409, 'This account/email is already registered')
      }
      const bcryptPassword = await bcrypt.hash(password, 10)
      const newUser = await prisma.User.create({
        data: {
          email,
          account,
          password: bcryptPassword,
          name,
          type: 'User',
        },
      })
      delete newUser.password
      return res.json(newUser)
    } catch (err) {
      next(err)
    }
  },
  signIn: (req, res, next) => {
    try {
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
