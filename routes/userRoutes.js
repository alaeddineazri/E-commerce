//user routes
const express = require('express')
const router = express.Router()
// import from controllers
const {Signup} = require('../controllers/userController')
const {userSignupValidator} = require('../validator')

router.post('/signup',userSignupValidator, Signup)



module.exports = router



