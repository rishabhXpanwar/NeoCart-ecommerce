// src/middlewares/errorMiddleware.js

// Middleware for 404 Not Found routes
const notFound = (req, res, next) => {
  // set status to 404 then forward an Error to the central error handler
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
};

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  // If response status is still 200, treat it as server error (500)
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    success: false,
    message: err.message,
    // show stack trace only in development
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};

// Export using CommonJS so require() works
module.exports = { notFound, errorHandler };
