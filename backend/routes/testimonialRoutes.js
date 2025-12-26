import express from 'express';
const router = express.Router();
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { handleSingleUpload } from '../middleware/uploadMiddleware.js'; // <-- 1. IMPORT
import {
  validateTestimonial,
  handleValidationErrors,
} from '../middleware/validationMiddleware.js';

// --- Public Route (No Change) ---
router.get('/', getTestimonials);

// --- Admin Routes (Updated) ---
router.post(
  '/',
  protect,
  admin,
  handleSingleUpload('the_space_stylers/testimonials'), // <-- 2. ADD UPLOAD
  validateTestimonial,
  handleValidationErrors,
  createTestimonial
);

router.put(
  '/:id',
  protect,
  admin,
  handleSingleUpload('the_space_stylers/testimonials'), // <-- 3. ADD UPLOAD
  validateTestimonial,
  handleValidationErrors,
  updateTestimonial
);

router.delete('/:id', protect, admin, deleteTestimonial);

export default router;