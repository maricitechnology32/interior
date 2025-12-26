import mongoose from 'mongoose';

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

// Section schema for rich content
const sectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'image'],
    required: true,
  },
  content: {
    type: String, // For text sections
  },
  image: {
    url: String,
    public_id: String,
  },
  caption: {
    type: String, // Optional image caption
  },
});

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // Legacy content field (for backward compatibility)
    content: {
      type: String,
      required: false,
    },
    // New sections array for rich content
    sections: [sectionSchema],
    // Cover/featured image for blog listing
    image: {
      type: imageSchema,
      required: false,
    },
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

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;