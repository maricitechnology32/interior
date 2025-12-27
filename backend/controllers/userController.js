import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

// --- @desc    Register a new user
// --- @route   POST /api/users/register
// --- @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // 1. Get name, email, and password from the request body
  const { name, email, password } = req.body;

  // 2. (AC 1.5) Check if the user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // 400 = Bad Request
    throw new Error('User already exists');
  }

  // 3. Create the new user in the database
  //    (Our userModel.js 'pre-save' hook will automatically hash the password)
  const user = await User.create({
    name,
    email,
    password,
    // 'role' will automatically default to 'User' (from AC 1.4)
  });

  // 4. If user was created successfully, log them in (generate a token)
  if (user) {
    const token = generateToken(user._id, user.role);

    // 5. Send the new user's data and token back as a response
    res.status(201).json({ // 201 = Created
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage, // Added
      token: token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// --- @desc    Auth user & get token (Login)
// --- @route   POST /api/users/login
// --- @access  Public
const loginUser = asyncHandler(async (req, res) => {
  // 1. Get email and password from the request body
  const { email, password } = req.body;

  // 2. Find the user by their email
  const user = await User.findOne({ email });

  // 3. (AC 2.1) Check if user exists AND if the password matches
  //    (We use the 'matchPassword' method we created in userModel.js)
  if (user && (await user.matchPassword(password))) {
    // 4. (AC 2.2) Generate a token for them
    const token = generateToken(user._id, user.role);

    // 5. Send the user's data and token back as a response
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage, // Added
      token: token,
    });
  } else {
    // 6. (AC 2.4) If login fails, send an 'Unauthorized' status
    res.status(401); // 401 = Unauthorized
    throw new Error('Invalid email or password');
  }
});
const getUserProfile = asyncHandler(async (req, res) => {
  // The 'protect' middleware already found the user and attached it to 'req'
  const user = req.user;

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage, // Added
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;

    if (req.body.password) {
      user.password = req.body.password;
    }

    // Handle Image Update
    if (req.body.image) {
      // Should match the structure from uploadMiddleware
      // If previous image exists (and has public_id), we might want to delete it from Cloudinary here,
      // but for now let's just overwrite the reference.
      user.profileImage = {
        url: req.body.image.url,
        public_id: req.body.image.public_id
      };
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      profileImage: updatedUser.profileImage,
      token: generateToken(updatedUser._id, updatedUser.role), // Optional: Refresh token
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  // Note: This points to the FRONTEND
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. \n\n Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Token',
      message,
      html: `
        <h1>You requested a password reset</h1>
        <p>Please go to this link to reset your password:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (error) {
    console.error(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500);
    throw new Error('Email could not be sent');
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid token');
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(201).json({
    success: true,
    data: 'Password reset success',
    token: generateToken(user._id, user.role),
  });
});

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword
};