// product routes
const express = require('express')
const router = express.Router()
// import from controllers
const {createProduct ,getProductById , productById , deleteProduct , updateProduct} = require('../controllers/productController')
// import middleware
const {userById} = require('../controllers/userController')
const {isAuth ,  isAdmin } = require('../controllers/authController')
const { tokenMiddleware } = require('../middleware/tokenMiddleware')

router.param('userId',userById)
router.param('productId',productById)

router.post('/product/create/:userId',tokenMiddleware,isAuth,isAdmin,createProduct)
router.get('/product/:productId',getProductById)
router.delete('/product/:productId/:userId',tokenMiddleware,isAuth,isAdmin,deleteProduct)
router.put('/product/:productId/:userId',tokenMiddleware,isAuth,isAdmin,updateProduct)


module.exports = router;