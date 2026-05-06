const mongoose = require('mongoose');

const blogMetaSchema = new mongoose.Schema(
  {
    title: String, description: String, keywords: String,
    og_title: String, og_description: String, og_image: String,
    canonical_url: String, twitter_card: String, twitter_title: String,
    twitter_description: String, twitter_image: String,
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    cover_image: { type: String, default: null },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    published_at: { type: Date, default: null },
    reading_time: { type: Number, default: 0 },
    meta: { type: blogMetaSchema, default: null },
  },
  { timestamps: true }
);

blogSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    const words = this.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
    this.reading_time = Math.ceil(words / 200);
  }
  if (this.status === 'published' && !this.published_at) {
    this.published_at = new Date();
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
