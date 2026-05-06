const { body } = require('express-validator');

const createTagValidator = [
  body('name').notEmpty().trim().withMessage('Tag name is required'),
];
const updateTagValidator = [
  body('name').optional().notEmpty().trim().withMessage('Tag name cannot be empty'),
];

module.exports = { createTagValidator, updateTagValidator };
