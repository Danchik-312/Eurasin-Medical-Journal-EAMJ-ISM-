const logger = require('./logger');

class AppError extends Error {
    constructor(message, statusCode, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        ip: req.ip
    });

    const statusCode = err.statusCode || 500;
    const errorCode = err.errorCode || 'SERVER_ERROR';

    res.status(statusCode).json({
        status: 'error',
        error: {
            code: errorCode,
            message: err.message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
};

const notFoundHandler = (req, res, next) => {
    next(new AppError(`Resource not found: ${req.method} ${req.originalUrl}`, 404, 'NOT_FOUND'));
};

module.exports = {
    AppError,
    errorHandler,
    notFoundHandler
};

