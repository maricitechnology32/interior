import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// --- 1. 'protect' Middleware (Checks for a valid token) ---
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the 'Authorization' header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer') // Format is 'Bearer <token>'
  ) {
    try {
      // Get token from header (split at the space and take the 2nd part)
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user from the token's ID
      // Attach the user object to the request (but not the password)
      req.user = await User.findById(decoded.userId).select('-password');

      // Call the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401); // 401 = Unauthorized
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// --- 2. 'admin' Middleware (Checks for 'Admin' role) ---
const admin = (req, res, next) => {
  // This middleware MUST run *after* the 'protect' middleware
  // so that we have 'req.user' available.
  if (req.user && req.user.role === 'Admin') {
    next(); // User is an admin, proceed
  } else {
    res.status(403); // 403 = Forbidden
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };