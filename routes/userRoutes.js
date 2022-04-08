//user routes
const express = require('express')
const router = express.Router()
// import from controllers
const {Signup , Login } = require('../controllers/userController')
const {userSignupValidator} = require('../validator')

router.post('/signup',userSignupValidator, Signup)
router.post('/login', Login)



module.exports = router



