const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: null },
    description: { type: String, trim: true, default: null },
    keyword: { type: String, trim: true, default: null },
    og_image: { type: String, default: null },
    favicon: { type: String, default: null },
    canonical_url: { type: String, trim: true, default: null },
    google_analytics_id: { type: String, trim: true, default: null },
    google_tag_manager_id: { type: String, trim: true, default: null },
    facebook_pixel_id: { type: String, trim: true, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
