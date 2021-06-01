const express = require("express");
const router = express.Router();

const {
  getCategorybyId,
  createCategory,
  getAllCategory,
  getCategory,
} = require("../controllers/category");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// params
router.param("userId", getUserById);
router.param("categoryId", getCategorybyId);

// actual routers

router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

module.exports = router;
