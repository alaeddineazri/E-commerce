//user routes
const express = require('express')
const router = express.Router()
// import from controllers
const {signup} = require('../controllers/user')

router.post('/signup', signup
)

module.exports = router