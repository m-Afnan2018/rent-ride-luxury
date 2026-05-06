const { body } = require('express-validator');

const createFaqValidator = [
  body('question').notEmpty().trim().withMessage('Question is required'),
  body('answer').notEmpty().trim().withMessage('Answer is required'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
  body('is_active').optional().isBoolean().withMessage('is_active must be boolean'),
];
const updateFaqValidator = [
  body('question').optional().notEmpty().trim().withMessage('Question cannot be empty'),
  body('answer').optional().notEmpty().trim().withMessage('Answer cannot be empty'),
  body('order').optional().isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
  body('is_active').optional().isBoolean().withMessage('is_active must be boolean'),
];

module.exports = { createFaqValidator, updateFaqValidator };
