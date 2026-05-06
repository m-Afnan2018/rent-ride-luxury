const { body } = require('express-validator');

const createUserValidator = [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email_id').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('role').optional().isIn(['admin', 'staff']).withMessage('Role must be admin or staff'),
  body('phone_number').optional().trim(),
];

const updateUserValidator = [
  body('name').optional().notEmpty().trim().withMessage('Name cannot be empty'),
  body('email_id').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('role').optional().isIn(['admin', 'staff']).withMessage('Role must be admin or staff'),
  body('status').optional().isIn(['active', 'suspended']).withMessage('Invalid status'),
  body('phone_number').optional().trim(),
];

module.exports = { createUserValidator, updateUserValidator };
