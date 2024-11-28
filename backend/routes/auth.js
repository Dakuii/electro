// auth.js

const express = require('express');
const { registerUser, loginUser, logoutUser, profileUser, updateUserProfile, requestPasswordReset, resetPassword, sendEmailToAdmin } = require('../controllers/authController');
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




module.exports = router;
