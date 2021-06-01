const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  removeProduct,
  getAllProducts,
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const router = express.Router();

// params
router.param("userId", getUserById);
router.param("productId", getProductById);

// actual routes

//create routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// delete route

router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

//update route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//listing route
router.get("/products", getAllProducts);

module.exports = router;
