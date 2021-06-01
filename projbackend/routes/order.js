const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getOrderById, createOrder } = require("../controllers/order");
const { updateStock } = require("../controllers/product");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//create routes
router.post(
  "/order/create/:usedId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);
//read route

module.exports = router;
