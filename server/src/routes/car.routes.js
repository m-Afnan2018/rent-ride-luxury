const router = require('express').Router();
const { getAll, getBySlug, getById, create, update, remove } = require('../controllers/car.controller');
const { protect } = require('../middlewares/auth.middleware');
const { createCarValidator, updateCarValidator } = require('../utils/validators/car.validator');
const validate = require('../middlewares/validate.middleware');

// Public
router.get('/', getAll);
router.get('/slug/:slug', getBySlug);

// Protected
router.get('/:id', protect, getById);
router.post('/', protect, createCarValidator, validate, create);
router.put('/:id', protect, updateCarValidator, validate, update);
router.delete('/:id', protect, remove);

module.exports = router;
