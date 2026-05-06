const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    image: { type: String, default: null },
    name: { type: String, required: true, trim: true },
    position_company: { type: String, trim: true, default: null },
    rating: { type: Number, min: 1, max: 5, required: true },
    review: { type: String, required: true, trim: true },
    time: { type: String, trim: true, default: null },
    car_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', default: null },
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
    is_featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
