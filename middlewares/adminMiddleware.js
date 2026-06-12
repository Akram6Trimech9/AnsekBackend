const ApiError = require('../utils/ApiError');

const admin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') return next(new ApiError('Admin access required', 403));
  next();
};

module.exports = admin;
