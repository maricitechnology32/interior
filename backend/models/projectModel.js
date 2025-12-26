import mongoose from 'mongoose';

// This is the new schema for an image, designed for Cloudinary
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

// Schema for Epic 3: Dynamic Content (Projects)
const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Residential', 'Commercial', 'Hospitality'],
    },
    // We now use the imageSchema defined above
    imageUrls: [imageSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;