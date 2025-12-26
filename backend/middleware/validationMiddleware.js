// import { check, validationResult } from 'express-validator';
// import asyncHandler from 'express-async-handler';

// // --- 1. Auth Validation Rules ---
// // (No changes here)
// export const validateRegistration = [
//   check('name', 'Name is required').not().isEmpty().trim().escape(),
//   check('email', 'Please include a valid email').isEmail().normalizeEmail(),
//   check(
//     'password',
//     'Password must be 8 or more characters'
//   ).isLength({ min: 8 }),
// ];

// export const validateLogin = [
//   check('email', 'Please include a valid email').isEmail().normalizeEmail(),
//   check('password', 'Password is required').exists(),
// ];

// // --- 2. Blog Validation Rules ---
// // (No changes here)
// export const validateBlog = [
//   // title: Must exist, not be empty, then sanitize
//   check('title', 'Title is required').not().isEmpty().trim().escape(),

//   // content: Must exist, not be empty, then sanitize
//   check('content', 'Content is required').not().isEmpty().trim().escape(),

//   // We remove the check for 'imageUrl'
//   // The 'image' is now an optional file, and our upload
//   // middleware already validates the file type and size.
// ];

// // --- 3. Project Validation Rules ---
// // (No changes here)
// export const validateProject = [
//   check('title', 'Title is required').not().isEmpty().trim().escape(),
//   check('description', 'Description is required')
//     .not()
//     .isEmpty()
//     .trim()
//     .escape(),
//   check('category', 'Category is required')
//     .isIn(['Residential', 'Commercial', 'Hospitality'])
//     .withMessage('Invalid category specified'),
//   check('imageUrls', 'At least one image is required')
//     .isArray({ min: 1 })
//     .withMessage('Please upload at least one image for the project'),
// ];

// // --- 4. Gallery Validation Rules ---
// // (No changes here)
// export const validateGallery = [
//   check('caption').optional().trim().escape(),
//   check('image', 'An image file is required')
//     .exists()
//     .withMessage('Please upload an image file'),
// ];

// // --- 5. Inquiry Validation Rules (NEW) ---

// export const validateInquiry = [
//   // name: Must exist, not be empty, then sanitize
//   check('name', 'Name is required').not().isEmpty().trim().escape(),

//   // email: Must be a valid email
//   check('email', 'Please include a valid email').isEmail().normalizeEmail(),

//   // phone: Optional, but if it exists, sanitize it
//   check('phone').optional().trim().escape(),

//   // message: Must exist, not be empty, then sanitize
//   check('message', 'Message is required').not().isEmpty().trim().escape(),
// ];

// // --- 6. The Handler (No change needed) ---

// export const handleValidationErrors = asyncHandler(async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // If there are errors, stop and send error
//     res.status(400);
//     throw new Error(errors.array()[0].msg);
//   }
//   // No errors? Move on to the controller
//   next();
// });

import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';

// --- 1. Auth Validation Rules ---
// (No changes here)
export const validateRegistration = [
  check('name', 'Name is required').not().isEmpty().trim().escape(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check(
    'password',
    'Password must be 8 or more characters'
  ).isLength({ min: 8 }),
];

export const validateLogin = [
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Password is required').exists(),
];

// --- 2. Blog Validation Rules ---
// Content is now optional since we use sections
export const validateBlog = [
  check('title', 'Title is required').not().isEmpty().trim().escape(),
  check('content').optional().trim(),
];

// --- 3. Project Validation Rules ---
// (No changes here)
export const validateProject = [
  check('title', 'Title is required').not().isEmpty().trim().escape(),
  check('description', 'Description is required')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check('category', 'Category is required')
    .isIn(['Residential', 'Commercial', 'Hospitality'])
    .withMessage('Invalid category specified'),
  check('imageUrls', 'At least one image is required')
    .isArray({ min: 1 })
    .withMessage('Please upload at least one image for the project'),
];

// --- 4. Gallery Validation Rules ---
// (No changes here)
export const validateGallery = [
  check('caption').optional().trim().escape(),
  check('image', 'An image file is required')
    .exists()
    .withMessage('Please upload an image file'),
];

// --- 5. Inquiry Validation Rules ---
export const validateInquiry = [
  check('firstName', 'First name is required').not().isEmpty().trim().escape(),
  check('lastName', 'Last name is required').not().isEmpty().trim().escape(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('phone').optional().trim().escape(),
  check('projectType', 'Please select a project type')
    .isIn([
      'Residential Design',
      'Commercial Design',
      'Hospitality Design',
      'Office Space',
      'Other',
    ]),
  check('budgetRange', 'Please select a budget range').not().isEmpty(),
  check('projectDetails', 'Project details are required')
    .not()
    .isEmpty()
    .trim()
    .escape(),
];

// --- 6. Testimonial Validation Rules (NEW) ---

export const validateTestimonial = [
  check('name', 'Client name is required').not().isEmpty().trim().escape(),
  check('title', 'Client title is required').not().isEmpty().trim().escape(),
  check('quote', 'Testimonial quote is required').not().isEmpty().trim().escape(),

  // NEW RULE for rating
  check('rating', 'Rating is required')
    .isFloat({ min: 1, max: 5 }) // Checks for a number between 1 and 5
    .withMessage('Rating must be a number between 1 and 5'),
];


// --- 7. The Handler (No change needed) ---

export const handleValidationErrors = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are errors, stop and send error
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }
  // No errors? Move on to the controller
  next();
});