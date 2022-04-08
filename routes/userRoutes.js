//user routes
const express = require('express')
const router = express.Router()
// import from controllers
const {Signup , Login , Logout } = require('../controllers/userController')
const {userSignupValidator} = require('../validator')

router.post('/signup',userSignupValidator, Signup)
router.post('/login', Login)
router.get('/logout', Logout)



module.exports = router



