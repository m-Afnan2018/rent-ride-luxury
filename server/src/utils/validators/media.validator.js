const { body } = require('express-validator');

const createMediaValidator = [
  body('entity_type').optional().isIn(['car', 'blog', 'brand', 'type', 'general']).withMessage('Invalid entity type'),
];

module.exports = { createMediaValidator };
