// product routes
const express = require("express");
const router = express.Router();
// import from controllers
const {
  createProduct,
  getProductById,
  productById,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductsRelated,
  getProductByCategory,
  listCategories,
  listBySearch,
  getProductPhoto
} = require("../controllers/productController");
// import middleware
const { userById } = require("../controllers/userController");
const { isAuth, isAdmin } = require("../controllers/authController");
const { tokenMiddleware } = require("../middleware/tokenMiddleware");

router.param("userId", userById);
router.param("productId", productById);

router.post(
  "/product/create/:userId",
  tokenMiddleware,
  isAuth,
  isAdmin,
  createProduct
);

router.get("/product/:productId", getProductById);

router.delete(
  "/product/:productId/:userId",
  tokenMiddleware,
  isAuth,
  isAdmin,
  deleteProduct
);

router.put(
  "/product/:productId/:userId",
  tokenMiddleware,
  isAuth,
  isAdmin,
  updateProduct
);


router.get("/products", getAllProducts);
router.get("/products/related/:productId", getProductsRelated);
router.get("/products/related/", getProductByCategory);
router.get("/products/categories/", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/products/photo/:productId", getProductPhoto);

module.exports = router;
