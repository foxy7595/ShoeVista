// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    console.error(err.stack);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation Error',
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    // Mongoose cast error (invalid ID)
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Duplicate key error
    if (err.code === 11000) {
        return res.status(409).json({ message: 'Duplicate entry' });
    }

    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
};

// Async handler wrapper to eliminate try-catch blocks
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
