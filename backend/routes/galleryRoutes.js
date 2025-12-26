import express from 'express';
const router = express.Router();
import {
  getGalleryImages,
  addGalleryImage,
  deleteGalleryImage,
} from '../controllers/galleryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { handleSingleUpload } from '../middleware/uploadMiddleware.js';
import {
  validateGallery,
  handleValidationErrors,
} from '../middleware/validationMiddleware.js';

// --- Public Routes (User Story 13) ---
// For visitors to see the gallery
router.get('/', getGalleryImages);

// --- Admin Routes (User Stories 12 & 14) ---

// Add a new image to the gallery
router.post(
  '/',
  protect, // 1. Check if logged in
  admin, // 2. Check if admin
  handleSingleUpload('the_space_stylers/gallery'), // 3. Upload ONE image
  validateGallery, // 4. Check caption & that image was uploaded
  handleValidationErrors, // 5. Handle any errors
  addGalleryImage // 6. (If all pass) Run controller
);

// Delete an image from the gallery
router.delete('/:id', protect, admin, deleteGalleryImage);

export default router;