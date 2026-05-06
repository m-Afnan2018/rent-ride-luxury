const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema(
  { label: { type: String, required: true }, amount: { type: Number, required: true }, currency: { type: String, default: 'USD' } },
  { _id: false }
);

const mediaItemSchema = new mongoose.Schema(
  { url: { type: String, required: true }, type: { type: String, enum: ['image', 'video'], default: 'image' } },
  { _id: false }
);

const carMetaSchema = new mongoose.Schema(
  {
    title: String, description: String, keywords: String,
    og_title: String, og_description: String, og_image: String,
    canonical_url: String, robots: { type: String, default: 'index, follow' }, schema_markup: String,
  },
  { _id: false }
);

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, trim: true, default: null },
    model: { type: String, trim: true, default: null },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', default: null },
    brand_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', default: null },
    prices: [priceSchema],
    year: { type: Number, default: null },
    fuel_type: { type: String, enum: ['petrol', 'diesel', 'electric', 'hybrid'], default: null },
    transmission: { type: String, enum: ['automatic', 'manual'], default: null },
    seating_capacity: { type: Number, default: null },
    is_featured: { type: Boolean, default: false },
    availability_status: { type: String, enum: ['available', 'rented', 'maintenance'], default: 'available' },
    color: { type: String, trim: true, default: null },
    features: [{ type: String }],
    media: [mediaItemSchema],
    feature_image: { type: String, default: null },
    meta: { type: carMetaSchema, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);
