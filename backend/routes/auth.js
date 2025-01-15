// auth.js

const express = require('express');
const { registerUser, loginUser, logoutUser, profileUser, updateUserProfile, 
        requestPasswordReset, resetPassword, sendEmailToAdmin, addToCart, viewCart,
        updateCartQuantity, removeItemFromCart} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);
router.get('/profile', protect, profileUser);  // Add this line
router.put('/profile', protect, updateUserProfile);  // Protect middleware ensures user is authenticated
router.post('/request-password-reset', requestPasswordReset);
router.put('/reset-password/:token', resetPassword);
router.post('/send-message', sendEmailToAdmin);
router.post("/add-to-cart", protect, addToCart);
router.get("/view-cart", protect, viewCart);  // New route for viewing the cart
router.put("/update-cart", protect, updateCartQuantity);  // New route for updating the cart quantity
router.delete("/remove-item", protect, removeItemFromCart);  // New route for removing items from cart


module.exports = router;
