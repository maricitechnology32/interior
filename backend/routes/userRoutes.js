import express from 'express';
const router = express.Router();
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { handleSingleUpload } from '../middleware/uploadMiddleware.js';
import {
  validateRegistration,
  validateLogin,
  handleValidationErrors,
} from '../middleware/validationMiddleware.js';

// --- Public Routes ---

// @route   POST /api/users/register
// This is now a chain of middleware.
router.post(
  '/register',
  authLimiter, // 1. Apply strict rate limit
  validateRegistration, // 2. Apply validation rules
  handleValidationErrors, // 3. Handle any validation errors
  registerUser // 4. (If all pass) Run controller logic
);

// @route   POST /api/users/login
router.post(
  '/login',
  authLimiter, // 1. Apply strict rate limit
  validateLogin, // 2. Apply validation rules
  handleValidationErrors, // 3. Handle any validation errors
  loginUser // 4. (If all pass) Run controller logic
);

// @route   POST /api/users/forgot-password
router.post('/forgot-password', authLimiter, forgotPassword);

// @route   PUT /api/users/reset-password/:resetToken
router.put('/reset-password/:resetToken', authLimiter, resetPassword);

// --- Private Routes ---
// @route   GET /api/users/profile
router.get(
  '/profile',
  protect, // This route is already secure
  getUserProfile
);

// @route   PUT /api/users/profile
router.put(
  '/profile',
  protect,
  handleSingleUpload('profiles'), // Middleware to handle image upload
  updateUserProfile
);

export default router;