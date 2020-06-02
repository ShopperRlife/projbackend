const express = require("express");
const router = express.Router();

const {
  getSubcategoryById,
  createSubcategory,
  getSubcategory,
  getAllSubCategory,
  updateSubCategory,
  removeSubCategory
} = require("../controllers/subcategory");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("subcategoryId", getSubcategoryById);

//actual routers goes here

//create
router.post(
  "/subcategory/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createSubcategory
);

//read
router.get("/subcategory/:subcategoryId", getSubcategory);
router.get("/subcategories", getAllSubCategory);

//update
router.put(
  "/subcategory/:subcategoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateSubCategory
);

//delete

router.delete(
  "/subcategory/:subcategoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeSubCategory
);

module.exports = router;
