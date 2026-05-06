const { body } = require('express-validator');

const loginValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const refreshValidator = [
  body('refresh_token').notEmpty().withMessage('Refresh token is required'),
];

module.exports = { loginValidator, refreshValidator };
