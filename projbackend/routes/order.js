const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getOrderStatus,
  getOrderById,
  createOrder,
  updateStatus,
  getAllorders,
} = require("../controllers/order");

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
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllorders
);

//status of order

router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
