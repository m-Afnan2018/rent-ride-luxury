const { body } = require('express-validator');

const carRules = [
  body('name').optional().notEmpty().trim().withMessage('Car name cannot be empty'),
  body('fuel_type').optional().isIn(['petrol', 'diesel', 'electric', 'hybrid']).withMessage('Invalid fuel type'),
  body('transmission').optional().isIn(['automatic', 'manual']).withMessage('Invalid transmission'),
  body('availability_status').optional().isIn(['available', 'rented', 'maintenance']).withMessage('Invalid availability status'),
  body('year').optional().isInt({ min: 1900, max: new Date().getFullYear() + 2 }).withMessage('Invalid year'),
  body('seating_capacity').optional().isInt({ min: 1, max: 50 }).withMessage('Invalid seating capacity'),
  body('prices').optional().isArray().withMessage('Prices must be an array'),
  body('prices.*.label').optional().notEmpty().withMessage('Price label is required'),
  body('prices.*.amount').optional().isNumeric().withMessage('Price amount must be a number'),
];

const createCarValidator = [
  body('name').notEmpty().trim().withMessage('Car name is required'),
  ...carRules.slice(1),
];

const updateCarValidator = carRules;

module.exports = { createCarValidator, updateCarValidator };
