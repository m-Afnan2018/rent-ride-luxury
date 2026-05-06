const { body } = require('express-validator');

const createLeadValidator = [
  body('fullname').notEmpty().trim().withMessage('Full name is required'),
  body('email_id').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone_number').notEmpty().trim().withMessage('Phone number is required'),
  body('source').optional().isIn(['website', 'instagram', 'whatsapp', 'phone', 'other']).withMessage('Invalid source'),
  body('status').optional().isIn(['new', 'contacted', 'qualified', 'lost', 'converted']).withMessage('Invalid status'),
];

const updateLeadValidator = [
  body('fullname').optional().notEmpty().trim().withMessage('Full name cannot be empty'),
  body('email_id').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('source').optional().isIn(['website', 'instagram', 'whatsapp', 'phone', 'other']).withMessage('Invalid source'),
  body('status').optional().isIn(['new', 'contacted', 'qualified', 'lost', 'converted']).withMessage('Invalid status'),
];

module.exports = { createLeadValidator, updateLeadValidator };
