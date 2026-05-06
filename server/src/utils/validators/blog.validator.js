const { body } = require('express-validator');

const createBlogValidator = [
  body('title').notEmpty().trim().withMessage('Blog title is required'),
  body('content').notEmpty().withMessage('Blog content is required'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
];

const updateBlogValidator = [
  body('title').optional().notEmpty().trim().withMessage('Title cannot be empty'),
  body('content').optional().notEmpty().withMessage('Content cannot be empty'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
];

module.exports = { createBlogValidator, updateBlogValidator };
