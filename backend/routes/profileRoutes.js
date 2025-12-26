import express from 'express';
import {
    getProfile,
    updateProfile,
    getUserInquiries,
} from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';
import { handleSingleUpload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// All routes are protected (require login)
router.get('/', protect, getProfile);
router.put('/', protect, handleSingleUpload('the_space_stylers/profiles'), updateProfile);
router.get('/inquiries', protect, getUserInquiries);

export default router;
