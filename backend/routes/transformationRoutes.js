import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
    getActiveTransformation,
    getTransformations,
    createTransformation,
    updateTransformation,
    deleteTransformation
} from '../controllers/transformationController.js';

const router = express.Router();

router.get('/active', getActiveTransformation);
router.route('/')
    .get(protect, admin, getTransformations)
    .post(protect, admin, createTransformation);
router.route('/:id')
    .put(protect, admin, updateTransformation)
    .delete(protect, admin, deleteTransformation);

export default router;
