//user routes
const express = require('express')
const router = express.Router()
// import from controllers
const {hi} = require('../controllers/user')

router.get('/', hi
)

module.exports = router