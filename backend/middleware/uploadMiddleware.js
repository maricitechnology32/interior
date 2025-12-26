import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import asyncHandler from 'express-async-handler';
import path from 'path';

// --- 1. Multer Configuration (No Change) ---
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    console.log('Multer FileFilter: Invalid file type:', file.mimetype, path.extname(file.originalname));
    cb(new Error('Images only! (jpeg, jpg, png, webp, gif)'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// --- 2. Cloudinary Upload Function (No Change) ---
const uploadToCloudinary = (fileBuffer, folderName) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
    stream.end(fileBuffer);
  });
};

// --- 3. Multi-Upload Middleware (For Projects - No Change) ---
export const handleUploads = (folderName) =>
  asyncHandler(async (req, res, next) => {
    await new Promise((resolve, reject) => {
      upload.array('images', 10)(req, res, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });

    if (!req.files || req.files.length === 0) {
      return next();
    }

    try {
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer, folderName)
      );
      const uploadedImages = await Promise.all(uploadPromises);
      req.body.imageUrls = uploadedImages; // Note: 'imageUrls' (plural)
      next();
    } catch (error) {
      res.status(500);
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  });

// --- 4. Single-Upload Middleware (NEW - For Gallery) ---
export const handleSingleUpload = (folderName) =>
  asyncHandler(async (req, res, next) => {
    // 1. Use multer to parse a 'image' (single file)
    await new Promise((resolve, reject) => {
      upload.single('image')(req, res, (err) => {
        if (err) {
          // Handle multer errors
          return reject(err);
        }
        resolve();
      });
    });

    // 2. Check if a file was uploaded
    if (!req.file) {
      // No file was uploaded. Our validation middleware
      // (in the next step) will catch this if it was required.
      return next();
    }

    // 3. Upload the single file to Cloudinary
    try {
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        folderName
      );

      // 4. Attach the Cloudinary data to req.body.image (singular)
      req.body.image = uploadedImage;

      next();
    } catch (error) {
      // console.error("Upload Middleware Error:", error);
      res.status(500);
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  });