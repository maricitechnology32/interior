import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Inquiry from '../models/inquiryModel.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get current user profile
// @route   GET /api/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone || '',
            profileImage: user.profileImage || { url: '', public_id: '' },
            createdAt: user.createdAt,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Update name and phone if provided
    user.name = req.body.name || user.name;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;

    // Handle profile image upload
    if (req.body.image) {
        // Delete old image if exists
        if (user.profileImage?.public_id) {
            try {
                await cloudinary.uploader.destroy(user.profileImage.public_id);
            } catch (err) {
                console.error('Failed to delete old profile image:', err);
            }
        }
        user.profileImage = req.body.image;
    }

    // Update password if provided
    if (req.body.password) {
        user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        profileImage: updatedUser.profileImage,
    });
});

// @desc    Get inquiries for current user (by email)
// @route   GET /api/profile/inquiries
// @access  Private
const getUserInquiries = asyncHandler(async (req, res) => {
    const inquiries = await Inquiry.find({ email: req.user.email }).sort({
        createdAt: -1,
    });

    res.json(inquiries);
});

export { getProfile, updateProfile, getUserInquiries };
