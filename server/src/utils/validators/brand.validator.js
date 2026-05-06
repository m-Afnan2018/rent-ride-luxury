const { body } = require('express-validator');

const createBrandValidator = [
  body('name').notEmpty().trim().withMessage('Brand name is required'),
  body('description').optional().trim(),
];
const updateBrandValidator = [
  body('name').optional().notEmpty().trim().withMessage('Brand name cannot be empty'),
  body('description').optional().trim(),
];

module.exports = { createBrandValidator, updateBrandValidator };
