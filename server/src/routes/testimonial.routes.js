const router = require('express').Router();
const { getAll, getAllAdmin, getOne, create, update, remove } = require('../controllers/testimonial.controller');
const { protect } = require('../middlewares/auth.middleware');
const { createTestimonialValidator, updateTestimonialValidator } = require('../utils/validators/testimonial.validator');
const validate = require('../middlewares/validate.middleware');

// Public - only approved
router.get('/', getAll);

// Protected
router.get('/admin/all', protect, getAllAdmin);
router.get('/:id', protect, getOne);
router.post('/', protect, createTestimonialValidator, validate, create);
router.put('/:id', protect, updateTestimonialValidator, validate, update);
router.delete('/:id', protect, remove);

module.exports = router;
