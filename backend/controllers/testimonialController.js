import asyncHandler from 'express-async-handler';
import Testimonial from '../models/testimonialModel.js';
import cloudinary from '../config/cloudinary.js'; // <-- 1. IMPORT

// --- Public Route (No Change) ---
const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
  res.json(testimonials);
});

// --- Admin Routes (Updated) ---

// @desc    Create a new testimonial
const createTestimonial = asyncHandler(async (req, res) => {
  // Get all data from the FormData body
  const { name, title, quote, rating } = req.body;
  const image = req.body.image; // From handleSingleUpload

  const testimonial = new Testimonial({
    name,
    title,
    quote,
    rating,
    image: image || undefined, // Set image if it exists
    user: req.user._id,
  });

  const createdTestimonial = await testimonial.save();
  res.status(201).json(createdTestimonial);
});

// @desc    Update an existing testimonial
const updateTestimonial = asyncHandler(async (req, res) => {
  const { name, title, quote, rating } = req.body;
  const newImage = req.body.image; // New image (if any)

  const testimonial = await Testimonial.findById(req.params.id);

  if (testimonial) {
    // If a new image was uploaded...
    if (newImage) {
      // ...and an old image exists, delete it
      if (testimonial.image && testimonial.image.public_id) {
        try {
          await cloudinary.uploader.destroy(testimonial.image.public_id);
        } catch (err) {
          console.error('Failed to delete old image:', err);
        }
      }
      // Set the new image
      testimonial.image = newImage;
    }

    // Update other fields
    testimonial.name = name || testimonial.name;
    testimonial.title = title || testimonial.title;
    testimonial.quote = quote || testimonial.quote;
    testimonial.rating = rating || testimonial.rating;

    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
  }
});

// @desc    Delete a testimonial
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (testimonial) {
    // Also delete the image from Cloudinary
    if (testimonial.image && testimonial.image.public_id) {
      try {
        await cloudinary.uploader.destroy(testimonial.image.public_id);
      } catch (err) {
        console.error('Failed to delete image:', err);
      }
    }

    await testimonial.deleteOne();
    res.json({ message: 'Testimonial removed' });
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
  }
});

export {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};