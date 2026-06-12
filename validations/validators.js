const { body, validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errMessages = errors.array().map(e => e.msg).join(', ');
    return next(new ApiError(errMessages, 400));
  }
  next();
};

const validateRegister = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validationMiddleware,
];

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validationMiddleware,
];

const validateArticle = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required'),
  validationMiddleware,
];

const validateEpisode = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  validationMiddleware,
];

const validateContact = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  validationMiddleware,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateArticle,
  validateEpisode,
  validateContact,
};
