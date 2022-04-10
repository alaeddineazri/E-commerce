//category routes
const express = require('express');
const router = express.Router();
//import from controllers
const { createCategory } = require('../controllers/categoryController');
//import middleware
const { tokenMiddleware } = require('../middleware/tokenMiddleware');
const { isAuth , isAdmin } = require('../controllers/authController');
const {userById} = require('../controllers/userController');


router.param('userId',userById)

router.post('/category/create/:userId',tokenMiddleware,isAuth, isAdmin, createCategory)


module.exports = router;
