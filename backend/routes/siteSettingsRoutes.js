import express from 'express';
const router = express.Router();

import {
    getSiteSettings,
    updateSiteSettings,
} from '../controllers/siteSettingsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { handleSingleUpload } from '../middleware/uploadMiddleware.js';

// @route   GET /api/settings
// @desc    Get site settings (public)
router.get('/', getSiteSettings);

// @route   PUT /api/settings
// @desc    Update site settings (admin only) - with image upload support
router.put(
    '/',
    protect,
    admin,
    handleSingleUpload('the_space_stylers/site_settings'),
    updateSiteSettings
);

export default router;
