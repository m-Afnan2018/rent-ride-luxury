const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ['image', 'video'], required: true },
    size: { type: Number, default: null },
    url: { type: String, required: true },
    mime_type: { type: String, default: null },
    entity_type: { type: String, enum: ['car', 'blog', 'brand', 'type', 'general'], default: 'general' },
    entity_id: { type: mongoose.Schema.Types.ObjectId, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Media', mediaSchema);
