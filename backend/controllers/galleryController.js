import asyncHandler from 'express-async-handler';
import Gallery from '../models/galleryModel.js';
import cloudinary from '../config/cloudinary.js';

// --- Public Routes ---

// @desc    Fetch all gallery images
// @route   GET /api/gallery
// @access  Public
const getGalleryImages = asyncHandler(async (req, res) => {
  const images = await Gallery.find({}).sort({ createdAt: -1 });
  res.json(images);
});

// --- Admin Routes ---

// @desc    Add a new gallery image
// @route   POST /api/gallery
// @access  Private/Admin
const addGalleryImage = asyncHandler(async (req, res) => {
  // Our middleware has already run and populated req.body
  const { caption, image } = req.body;

  const galleryItem = new Gallery({
    caption: caption || '',
    image: image, // The object { url, public_id } from our middleware
    user: req.user._id, // From 'protect' middleware
  });

  const createdGalleryItem = await galleryItem.save();
  res.status(201).json(createdGalleryItem);
});

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryImage = asyncHandler(async (req, res) => {
  const galleryItem = await Gallery.findById(req.params.id);

  if (galleryItem) {
    // 1. Delete the image from Cloudinary
    try {
      await cloudinary.uploader.destroy(galleryItem.image.public_id);
    } catch (error) {
      // Log the error but continue
      console.error('Failed to delete Cloudinary image:', error);
    }

    // 2. Delete the item from our database
    await galleryItem.deleteOne();
    res.json({ message: 'Gallery image removed' });
  } else {
    res.status(404);
    throw new Error('Gallery image not found');
  }
});

export { getGalleryImages, addGalleryImage, deleteGalleryImage };