const { body } = require('express-validator');

const createTypeValidator = [
  body('name').notEmpty().trim().withMessage('Type name is required'),
  body('description').optional().trim(),
];
const updateTypeValidator = [
  body('name').optional().notEmpty().trim().withMessage('Type name cannot be empty'),
  body('description').optional().trim(),
];

module.exports = { createTypeValidator, updateTypeValidator };
