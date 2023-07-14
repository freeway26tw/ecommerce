const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const passport = require('passport')

router.post('/signIn', passport.authenticate('local', {session: false}), userController.signIn)
router.post('/', userController.signUp)

module.exports = router