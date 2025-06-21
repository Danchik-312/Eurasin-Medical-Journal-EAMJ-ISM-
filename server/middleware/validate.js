const { AppError } = require('../utils/errorHandler');

const validatePagination = (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;

    if (isNaN(page) || page < 1) {
        return next(new AppError('Некорректный номер страницы', 400, 'INVALID_PAGE'));
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
        return next(new AppError('Некорректное количество элементов на странице (1-100)', 400, 'INVALID_LIMIT'));
    }

    next();
};

module.exports = { validatePagination };