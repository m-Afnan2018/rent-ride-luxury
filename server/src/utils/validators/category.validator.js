const { body } = require('express-validator');

const createCategoryValidator = [
  body('name').notEmpty().trim().withMessage('Category name is required'),
  body('description').optional().trim(),
];
const updateCategoryValidator = [
  body('name').optional().notEmpty().trim().withMessage('Category name cannot be empty'),
  body('description').optional().trim(),
];

module.exports = { createCategoryValidator, updateCategoryValidator };
