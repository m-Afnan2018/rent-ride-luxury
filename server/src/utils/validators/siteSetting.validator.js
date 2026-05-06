const { body } = require('express-validator');

const updateSiteSettingValidator = [
  body('title').optional().trim(),
  body('description').optional().trim(),
  body('keyword').optional().trim(),
  body('google_analytics_id').optional().trim(),
  body('google_tag_manager_id').optional().trim(),
  body('facebook_pixel_id').optional().trim(),
  body('canonical_url').optional().trim(),
];

module.exports = { updateSiteSettingValidator };
