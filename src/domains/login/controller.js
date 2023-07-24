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
  }
}

module.exports = userController
