//user routes
const express = require('express')
const router = express.Router()
// import from controllers
const {Signup} = require('../controllers/userController')

router.post('/signup', Signup)



module.exports = router



