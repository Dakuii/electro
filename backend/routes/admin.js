// routes/admin.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
} = require("../controllers/adminController");

const router = express.Router();

// Admin routes
router.post("/products", protect, admin, addProduct); // Add a product
router.put("/products/:id", protect, admin, updateProduct); // Update a product
router.delete("/products/:id", protect, admin, deleteProduct); // Delete a product
router.get("/products", getProducts); // Get all products
router.get("/products/:id", getProduct);


module.exports = router;
