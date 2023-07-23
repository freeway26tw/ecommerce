const express = require('express')
const router = express.Router()
const { checkUserExist, createUser } = require('./controller.js')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
  try {
    const { password, ...userData } = req.user
    if (userData.type !== 'User')
      throw createError(403, 'Access to the requested resource is forbidden')
    const token = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
    res.json({
      code: 1,
      msg: 'Success',
      result: {...userData, token},
    })
  } catch (error) {
    next(error)
  }
}
)
router.post('/', async (req, res, next) => {
    try {
      const { email, password, account, name } = req.body

      if (password !== req.body.checkPassword)
        throw createError(400, 'Passwords do not match!')

      if (await checkUserExist(account, email)) {
        throw createError(409, 'This account/email is already registered')
      }
      const newUser = await createUser(req.body)
      return res.json(newUser)
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
