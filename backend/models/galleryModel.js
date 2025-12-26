import mongoose from 'mongoose';

// --- Re-usable Image Schema ---
// This schema is designed for Cloudinary, storing both the
// secure URL and the public_id needed for deletion.
const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
});

// --- Gallery Schema ---
// Schema for Epic 4: Dynamic Content (Gallery)
const gallerySchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: false, // Caption is optional
      default: '',
    },
    // We are embedding the image schema directly
    // A gallery item *is* an image
    image: {
      type: imageSchema,
      required: true,
    },
    // Link to the admin who uploaded it
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
  }
);

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;