// product routes
const express = require('express')
const router = express.Router()
// import from controllers
const {createProduct } = require('../controllers/productController')
// import middleware
const {userById} = require('../controllers/userController')
const {isAuth ,  isAdmin } = require('../controllers/authController')
const { tokenMiddleware } = require('../middleware/tokenMiddleware')

router.param('userId',userById)

router.post('/product/create/:userId',tokenMiddleware,isAuth,isAdmin,createProduct)

module.exports = router;