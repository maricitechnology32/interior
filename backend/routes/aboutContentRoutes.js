import express from 'express';
const router = express.Router();

import {
    getAboutContent,
    updateAboutContent,
    uploadTeamMemberImage,
} from '../controllers/aboutContentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { handleSingleUpload } from '../middleware/uploadMiddleware.js';

// @route   GET /api/about
// @desc    Get about page content (public)
router.get('/', getAboutContent);

// @route   PUT /api/about
// @desc    Update about page content (admin only)
router.put(
    '/',
    protect,
    admin,
    handleSingleUpload('the_space_stylers/about'),
    updateAboutContent
);

// @route   POST /api/about/team-image
// @desc    Upload team member image
router.post(
    '/team-image',
    protect,
    admin,
    handleSingleUpload('the_space_stylers/team'),
    uploadTeamMemberImage
);

export default router;
