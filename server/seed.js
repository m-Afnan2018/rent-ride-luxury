require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const SiteSetting = require('./src/models/SiteSetting');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email_id: process.env.SEED_ADMIN_EMAIL });
    if (existing) {
      console.log('Admin user already exists:', existing.email_id);
    } else {
      const admin = await User.create({
        name: process.env.SEED_ADMIN_NAME || 'Admin',
        email_id: process.env.SEED_ADMIN_EMAIL || 'admin@rentluxury.com',
        password_hash: process.env.SEED_ADMIN_PASSWORD || 'Admin@123456',
        role: 'admin',
        status: 'active',
        phone_number: process.env.SEED_ADMIN_PHONE || null,
      });
      console.log('Admin user created:', admin.email_id);
    }

    const existingSettings = await SiteSetting.findOne();
    if (!existingSettings) {
      await SiteSetting.create({
        title: 'Rent Ride Luxury',
        description: 'Premium luxury car rental services',
        keyword: 'luxury car rental, premium cars, exotic cars',
        robots: 'index, follow',
      });
      console.log('Default site settings created');
    }

    console.log('Seed completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();
