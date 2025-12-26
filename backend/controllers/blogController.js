import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.json(blogs);
});

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, sections } = req.body;
  const image = req.body.image;

  const blog = new Blog({
    title,
    content: content || '',
    sections: sections ? JSON.parse(sections) : [],
    image: image || undefined,
    user: req.user._id,
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc    Update an existing blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, sections } = req.body;
  const newImage = req.body.image;

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  // Handle cover image update
  if (newImage) {
    if (blog.image?.public_id) {
      try {
        await cloudinary.uploader.destroy(blog.image.public_id);
      } catch (err) {
        console.error('Failed to delete old blog image:', err);
      }
    }
    blog.image = newImage;
  }

  if (title !== undefined) blog.title = title;
  if (content !== undefined) blog.content = content;
  if (sections !== undefined) blog.sections = JSON.parse(sections);

  const updatedBlog = await blog.save();
  res.json(updatedBlog);
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  // Delete cover image from Cloudinary
  if (blog.image?.public_id) {
    try {
      await cloudinary.uploader.destroy(blog.image.public_id);
    } catch (err) {
      console.error('Failed to delete blog image:', err);
    }
  }

  // Delete section images from Cloudinary
  for (const section of blog.sections || []) {
    if (section.type === 'image' && section.image?.public_id) {
      try {
        await cloudinary.uploader.destroy(section.image.public_id);
      } catch (err) {
        console.error('Failed to delete section image:', err);
      }
    }
  }

  await blog.deleteOne();
  res.json({ message: 'Blog post removed' });
});

// @desc    Upload section image
// @route   POST /api/blogs/upload-section-image
// @access  Private/Admin
const uploadSectionImage = asyncHandler(async (req, res) => {
  if (!req.body.image) {
    res.status(400);
    throw new Error('No image uploaded');
  }

  res.json({
    url: req.body.image.url,
    public_id: req.body.image.public_id,
  });
});

export {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadSectionImage,
};