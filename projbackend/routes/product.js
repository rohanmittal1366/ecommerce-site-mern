const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getProductById, createProduct } = require("../controllers/product");
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

module.exports = router;
