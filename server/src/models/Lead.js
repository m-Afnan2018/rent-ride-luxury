const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    email_id: { type: String, required: true, trim: true, lowercase: true },
    phone_number: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: null },
    type: { type: String, trim: true, default: null },
    date: { type: Date, default: null },
    car_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', default: null },
    source: {
      type: String,
      enum: ['website', 'instagram', 'whatsapp', 'phone', 'other'],
      default: 'website',
    },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    rental_start_date: { type: Date, default: null },
    rental_end_date: { type: Date, default: null },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'lost', 'converted'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
