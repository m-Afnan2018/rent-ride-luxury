require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./src/config/db');
const errorHandler = require('./src/middlewares/error.middleware');

const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const carRoutes = require('./src/routes/car.routes');
const blogRoutes = require('./src/routes/blog.routes');
const leadRoutes = require('./src/routes/lead.routes');
const testimonialRoutes = require('./src/routes/testimonial.routes');
const categoryRoutes = require('./src/routes/category.routes');
const typeRoutes = require('./src/routes/type.routes');
const brandRoutes = require('./src/routes/brand.routes');
const tagRoutes = require('./src/routes/tag.routes');
const mediaRoutes = require('./src/routes/media.routes');
const faqRoutes = require('./src/routes/faq.routes');
const pageMetaRoutes = require('./src/routes/pageMeta.routes');
const siteSettingRoutes = require('./src/routes/siteSetting.routes');

const app = express();

connectDB();

const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  process.env.PRODUCTION_CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/types', typeRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/page-meta', pageMetaRoutes);
app.use('/api/site-settings', siteSettingRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;
