const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, trim: true, default: null },
    image: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Brand', brandSchema);
