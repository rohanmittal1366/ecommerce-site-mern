const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getProductById,
  createProduct,
  getProduct,
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const router = express.Router();

// params
router.param("userId", getUserById);
router.param("productId", getProductById);

// actual routes

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

module.exports = router;
