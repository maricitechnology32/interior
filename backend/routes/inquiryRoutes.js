import express from 'express';
const router = express.Router();
import {
  submitInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  validateInquiry,
  handleValidationErrors,
} from '../middleware/validationMiddleware.js';

// --- Public Route (User Story 15) ---
// Anyone can submit this form
router.post(
  '/',
  validateInquiry, // 1. Check input rules
  handleValidationErrors, // 2. Handle any errors
  submitInquiry // 3. (If all pass) Run controller
);

// --- Admin Routes (User Story 16) ---
// Admins only
router.get('/', protect, admin, getInquiries);

// Admins can update the status (e.g., 'New' -> 'Contacted')
router.put('/:id', protect, admin, updateInquiryStatus);

// Admins can delete an inquiry
router.delete('/:id', protect, admin, deleteInquiry);

export default router;