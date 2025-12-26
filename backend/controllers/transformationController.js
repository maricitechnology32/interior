import asyncHandler from 'express-async-handler';
import Transformation from '../models/transformationModel.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get active transformation
// @route   GET /api/transformations/active
// @access  Public
const getActiveTransformation = asyncHandler(async (req, res) => {
    const transformation = await Transformation.findOne({ isActive: true });
    // If no active transformation, return null or empty object, don't throw error
    res.json(transformation || null);
});

// @desc    Get all transformations
// @route   GET /api/transformations
// @access  Private/Admin
const getTransformations = asyncHandler(async (req, res) => {
    const transformations = await Transformation.find({}).sort({ createdAt: -1 });
    res.json(transformations);
});

// @desc    Create a transformation
// @route   POST /api/transformations
// @access  Private/Admin
const createTransformation = asyncHandler(async (req, res) => {
    const { title, description, beforeImage, afterImage } = req.body;

    const transformation = new Transformation({
        title,
        description,
        beforeImage,
        afterImage,
        isActive: false // Default to false
    });

    const createdTransformation = await transformation.save();
    res.status(201).json(createdTransformation);
});

// @desc    Update transformation
// @route   PUT /api/transformations/:id
// @access  Private/Admin
const updateTransformation = asyncHandler(async (req, res) => {
    const transformation = await Transformation.findById(req.params.id);

    if (transformation) {
        transformation.title = req.body.title || transformation.title;
        transformation.description = req.body.description || transformation.description;

        // Handle image updates if implemented
        if (req.body.beforeImage) transformation.beforeImage = req.body.beforeImage;
        if (req.body.afterImage) transformation.afterImage = req.body.afterImage;

        // Handle active status toggle
        if (req.body.isActive !== undefined) {
            // If setting to active, unset all others first
            if (req.body.isActive) {
                await Transformation.updateMany({}, { isActive: false });
            }
            transformation.isActive = req.body.isActive;
        }

        const updatedTransformation = await transformation.save();
        res.json(updatedTransformation);
    } else {
        res.status(404);
        throw new Error('Transformation not found');
    }
});

// @desc    Delete transformation
// @route   DELETE /api/transformations/:id
// @access  Private/Admin
const deleteTransformation = asyncHandler(async (req, res) => {
    const transformation = await Transformation.findById(req.params.id);

    if (transformation) {
        // Delete images from Cloudinary
        if (transformation.beforeImage && transformation.beforeImage.public_id) {
            await cloudinary.uploader.destroy(transformation.beforeImage.public_id);
        }
        if (transformation.afterImage && transformation.afterImage.public_id) {
            await cloudinary.uploader.destroy(transformation.afterImage.public_id);
        }

        await transformation.deleteOne();
        res.json({ message: 'Transformation removed' });
    } else {
        res.status(404);
        throw new Error('Transformation not found');
    }
});

export {
    getActiveTransformation,
    getTransformations,
    createTransformation,
    updateTransformation,
    deleteTransformation
};
