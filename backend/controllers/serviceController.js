import asyncHandler from 'express-async-handler';
import Service from '../models/serviceModel.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json(services);
});

// @desc    Get all services (including inactive) for admin
// @route   GET /api/services/admin
// @access  Private/Admin
const getServicesAdmin = asyncHandler(async (req, res) => {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (service) {
        res.json(service);
    } else {
        res.status(404);
        throw new Error('Service not found');
    }
});

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
    const { title, description, icon, link, order, isActive } = req.body;

    // Image is required
    if (!req.body.image) {
        res.status(400);
        throw new Error('Image is required');
    }

    const service = await Service.create({
        title,
        description,
        image: req.body.image,
        icon: icon || 'home',
        link: link || '/projects',
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json(service);
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        res.status(404);
        throw new Error('Service not found');
    }

    const { title, description, icon, link, order, isActive } = req.body;

    // Handle image upload
    if (req.body.image) {
        // Delete old image from Cloudinary
        if (service.image?.public_id) {
            try {
                await cloudinary.uploader.destroy(service.image.public_id);
            } catch (err) {
                console.error('Failed to delete old image:', err);
            }
        }
        service.image = req.body.image;
    }

    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (icon !== undefined) service.icon = icon;
    if (link !== undefined) service.link = link;
    if (order !== undefined) service.order = order;
    if (isActive !== undefined) service.isActive = isActive;

    const updatedService = await service.save();
    res.json(updatedService);
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        res.status(404);
        throw new Error('Service not found');
    }

    // Delete image from Cloudinary
    if (service.image?.public_id) {
        try {
            await cloudinary.uploader.destroy(service.image.public_id);
        } catch (err) {
            console.error('Failed to delete image:', err);
        }
    }

    await Service.deleteOne({ _id: req.params.id });
    res.json({ message: 'Service removed' });
});

export {
    getServices,
    getServicesAdmin,
    getServiceById,
    createService,
    updateService,
    deleteService,
};
