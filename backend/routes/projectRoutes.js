import express from 'express';
const router = express.Router();
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { handleUploads } from '../middleware/uploadMiddleware.js';
import {
  validateProject,
  handleValidationErrors,
} from '../middleware/validationMiddleware.js';

// --- Public Routes (User Story 9) ---
// These are for visitors to see the portfolio
router.get('/', getProjects);
router.get('/:id', getProjectById);

// --- Admin Routes (User Stories 8, 10, 11) ---

// Create a project
router.post(
  '/',
  protect, // 1. Check if logged in
  admin, // 2. Check if admin
  handleUploads('the_space_stylers/projects'), // 3. Upload images to Cloudinary
  validateProject, // 4. Check text fields & that images were uploaded
  handleValidationErrors, // 5. Handle any validation errors
  createProject // 6. (If all pass) Run controller
);

// Update a project
router.put(
  '/:id',
  protect,
  admin,
  handleUploads('the_space_stylers/projects'), // 3. Upload *new* images (if any)
  validateProject, // 4. Validate text fields
  handleValidationErrors,
  updateProject
);

// Delete a project
router.delete('/:id', protect, admin, deleteProject);

export default router;