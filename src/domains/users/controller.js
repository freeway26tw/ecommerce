const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const createError = require('http-errors')

const userController = {
  checkUserExist: async (account, email) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ account }, { email }],
        },
      })
      if (user) {
        return true
      }
      return false
    } catch (err) {
      throw createError(500, 'checkUserExist Error')
    }
  },
  createUser: async (data) => {
    try {
      delete data.checkPassword
      const bcryptPassword = await bcrypt.hash(data.password, 10)
      const newUser = await prisma.User.create({
        data: { ...data, password: bcryptPassword, type: 'User' },
      })
      delete newUser.password
      return newUser
    } catch (err) {
      throw createError(500, 'createUser Error')
    }
  },
}

module.exports = userController
