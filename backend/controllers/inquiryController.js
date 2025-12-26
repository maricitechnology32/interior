import asyncHandler from 'express-async-handler';
import Inquiry from '../models/inquiryModel.js';

// --- Public Route ---

// @desc    Submit a new inquiry (Contact Form)
// @route   POST /api/inquiries
// @access  Public
// const submitInquiry = asyncHandler(async (req, res) => {
//   // Our 'validateInquiry' middleware has already checked the data
//   const { name, email, phone, message } = req.body;

//   // 'status' will default to 'New' as per our model
//   const inquiry = new Inquiry({
//     name,
//     email,
//     phone: phone || '',
//     message,
//   });

//   await inquiry.save();

//   // On the frontend, this message confirms the form was sent
//   res.status(201).json({ message: 'Inquiry submitted successfully. We will contact you soon!' });
// });

const submitInquiry = asyncHandler(async (req, res) => {
  // 1. Get all new fields from the body
  console.log('Submit Inquiry Body:', req.body);
  const {
    firstName,
    lastName,
    email,
    phone,
    projectType,
    budgetRange,
    projectDetails,
  } = req.body;

  // 2. Create the new inquiry
  const inquiry = new Inquiry({
    firstName,
    lastName,
    email,
    phone: phone || '',
    projectType,
    budgetRange,
    projectDetails,
    // 'status' will default to 'New'
  });

  await inquiry.save();

  res
    .status(201)
    .json({ message: 'Inquiry submitted! We will contact you soon.' });
});

// --- Admin Routes ---

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
const getInquiries = asyncHandler(async (req, res) => {
  // (AC 16.3) Find all inquiries, sort by 'createdAt' in descending order (newest first)
  const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
  res.json(inquiries);
});

// @desc    Update an inquiry's status
// @route   PUT /api/inquiries/:id
// @access  Private/Admin
const updateInquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  // Validate that the status is one of the allowed values
  if (!['New', 'Contacted', 'Closed'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  const inquiry = await Inquiry.findById(req.params.id);

  if (inquiry) {
    inquiry.status = status;
    const updatedInquiry = await inquiry.save();
    res.json(updatedInquiry);
  } else {
    res.status(404);
    throw new Error('Inquiry not found');
  }
});

// @desc    Delete an inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
const deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (inquiry) {
    await inquiry.deleteOne();
    res.json({ message: 'Inquiry removed' });
  } else {
    res.status(404);
    throw new Error('Inquiry not found');
  }
});

export {
  deleteInquiry, getInquiries, submitInquiry, updateInquiryStatus
};
