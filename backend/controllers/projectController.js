import asyncHandler from 'express-async-handler';
import cloudinary from '../config/cloudinary.js';
import Project from '../models/projectModel.js';

// --- Helper function to delete images from Cloudinary ---
const deleteCloudinaryImages = async (images) => {
  if (!images || images.length === 0) {
    return;
  }

  // Create an array of deletion promises
  const deletePromises = images.map((image) =>
    cloudinary.uploader.destroy(image.public_id)
  );

  try {
    // Wait for all deletions to complete
    await Promise.all(deletePromises);
  } catch (error) {
    // Log the error, but don't block the main operation
    // We still want to delete the project from our DB
    console.error('Failed to delete some Cloudinary images:', error);
  }
};

// --- Public Routes ---

// @desc    Fetch all projects (with category filter)
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const query = {};

  // (AC 9.3) Check for a category filter in the query string
  if (req.query.category) {
    query.category = req.query.category;
  }

  const projects = await Project.find(query).sort({ createdAt: -1 });
  res.json(projects);
});

// @desc    Fetch a single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// --- Admin Routes ---

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
  // Our 'handleUploads' and 'validateProject' middleware
  // have already run and checked the data.
  const { title, description, category, imageUrls } = req.body;

  const project = new Project({
    title,
    description,
    category,
    imageUrls, // This comes from our upload middleware
    user: req.user._id, // This comes from our 'protect' middleware
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = asyncHandler(async (req, res) => {
  const { title, description, category, imageUrls } = req.body;

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // If new images were uploaded (imageUrls exists in the body),
  // we must delete the *old* images from Cloudinary.
  if (imageUrls && imageUrls.length > 0) {
    // Delete old images
    await deleteCloudinaryImages(project.imageUrls);
    // Set the new images
    project.imageUrls = imageUrls;
  }

  // Update text fields
  project.title = title || project.title;
  project.description = description || project.description;
  project.category = category || project.category;

  const updatedProject = await project.save();
  res.json(updatedProject);
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    // 1. Delete all associated images from Cloudinary
    await deleteCloudinaryImages(project.imageUrls);

    // 2. Delete the project from our database
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

export {
    createProject, deleteProject, getProjectById, getProjects, updateProject
};
