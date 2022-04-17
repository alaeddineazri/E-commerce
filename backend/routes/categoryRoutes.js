//category routes
const express = require('express');
const router = express.Router();
//import from controllers
const { createCategory , categoryById , getCategoryById , getAllCategories , updateCategory , deleteCategory  } = require('../controllers/categoryController');
//import middleware
const { tokenMiddleware } = require('../middleware/tokenMiddleware');
const { isAuth , isAdmin } = require('../controllers/authController');
const {userById} = require('../controllers/userController');

// create categoryBy id router  
router.param('categoryId',categoryById)

router.param('userId',userById)

// get category by id router
router.get('/category/:categoryId', getCategoryById)
// create category router
router.post('/category/create/:userId',tokenMiddleware,isAuth, isAdmin, createCategory)
//update category
router.put('/category/:categoryId/:userId',tokenMiddleware,isAuth, isAdmin, updateCategory)
//delete category
router.delete('/category/:categoryId/:userId',tokenMiddleware,isAuth, isAdmin, deleteCategory)
//get all categories
router.get('/categories', getAllCategories)

module.exports = router;
