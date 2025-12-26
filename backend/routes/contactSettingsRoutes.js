import express from 'express';
const router = express.Router();

import {
    getContactSettings,
    updateContactSettings,
} from '../controllers/contactSettingsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { handleSingleUpload } from '../middleware/uploadMiddleware.js';

// @route   GET /api/contact-settings
// @desc    Get contact settings (public)
router.get('/', getContactSettings);

// @route   PUT /api/contact-settings
// @desc    Update contact settings (admin only)
router.put(
    '/',
    protect,
    admin,
    handleSingleUpload('the_space_stylers/contact'),
    updateContactSettings
);

export default router;
