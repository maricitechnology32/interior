import express from 'express';
const router = express.Router();
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadSectionImage,
} from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { handleSingleUpload } from '../middleware/uploadMiddleware.js';
import {
  validateBlog,
  handleValidationErrors,
} from '../middleware/validationMiddleware.js';

// --- Public Routes ---
router.get('/', getBlogs);
router.get('/:id', getBlogById);

// --- Admin Routes ---

// Upload section image
router.post(
  '/upload-section-image',
  protect,
  admin,
  handleSingleUpload('the_space_stylers/blog'),
  uploadSectionImage
);

// Create blog
router.post(
  '/',
  protect,
  admin,
  handleSingleUpload('the_space_stylers/blog'),
  validateBlog,
  handleValidationErrors,
  createBlog
);

// Update blog
router.put(
  '/:id',
  protect,
  admin,
  handleSingleUpload('the_space_stylers/blog'),
  validateBlog,
  handleValidationErrors,
  updateBlog
);

// Delete blog
router.delete('/:id', protect, admin, deleteBlog);

export default router;