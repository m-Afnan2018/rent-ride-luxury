const mongoose = require('mongoose');

const pageMetaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true, trim: true },
    title: { type: String, trim: true, default: null },
    description: { type: String, trim: true, default: null },
    keywords: { type: String, trim: true, default: null },
    og_title: { type: String, trim: true, default: null },
    og_description: { type: String, trim: true, default: null },
    og_image: { type: String, default: null },
    canonical_url: { type: String, trim: true, default: null },
    schema_markup: { type: String, default: null },
    robots: { type: String, default: 'index, follow' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PageMeta', pageMetaSchema);
