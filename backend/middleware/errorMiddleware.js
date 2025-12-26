// Handles 404 errors (routes that don't exist)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Passes the error to the next middleware (our errorHandler)
};

// Handles all other errors (e.g., validation errors, server errors)
const errorHandler = (err, req, res, next) => {
  // If the error came in with a 200 (OK) status, set it to 500 (Server Error)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle specific Mongoose errors (like a badly formatted ID)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Send the error back as a JSON response
  res.status(statusCode).json({
    message: message,
    // Only show the error 'stack' if we are not in production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };