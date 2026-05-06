const { body, query } = require('express-validator');

const createPageMetaValidator = [
  body('url').notEmpty().trim().withMessage('URL is required'),
];
const updatePageMetaValidator = [
  body('url').optional().notEmpty().trim().withMessage('URL cannot be empty'),
];
const getByUrlValidator = [
  query('url').notEmpty().withMessage('url query parameter is required'),
];

module.exports = { createPageMetaValidator, updatePageMetaValidator, getByUrlValidator };
