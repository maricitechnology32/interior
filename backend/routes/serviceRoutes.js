import express from 'express';
const router = express.Router();

import {
    getServices,
    getServicesAdmin,
    getServiceById,
    createService,
    updateService,
    deleteService,
} from '../controllers/serviceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { handleSingleUpload } from '../middleware/uploadMiddleware.js';

// Public routes
router.get('/', getServices);
router.get('/:id', getServiceById);

// Admin routes
router.get('/admin/all', protect, admin, getServicesAdmin);
router.post('/', protect, admin, handleSingleUpload('the_space_stylers/services'), createService);
router.put('/:id', protect, admin, handleSingleUpload('the_space_stylers/services'), updateService);
router.delete('/:id', protect, admin, deleteService);

export default router;
