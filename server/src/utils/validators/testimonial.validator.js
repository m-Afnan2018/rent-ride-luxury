const { body } = require('express-validator');

const createTestimonialValidator = [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').notEmpty().trim().withMessage('Review is required'),
  body('status').optional().isIn(['pending', 'approved']).withMessage('Invalid status'),
];

const updateTestimonialValidator = [
  body('name').optional().notEmpty().trim().withMessage('Name cannot be empty'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').optional().notEmpty().trim().withMessage('Review cannot be empty'),
  body('status').optional().isIn(['pending', 'approved']).withMessage('Invalid status'),
];

module.exports = { createTestimonialValidator, updateTestimonialValidator };
