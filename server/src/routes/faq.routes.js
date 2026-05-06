const router = require('express').Router();
const { getAll, getAllAdmin, getOne, create, update, remove } = require('../controllers/faq.controller');
const { protect } = require('../middlewares/auth.middleware');
const { createFaqValidator, updateFaqValidator } = require('../utils/validators/faq.validator');
const validate = require('../middlewares/validate.middleware');

// Public - only active
router.get('/', getAll);

// Protected
router.get('/admin/all', protect, getAllAdmin);
router.get('/:id', protect, getOne);
router.post('/', protect, createFaqValidator, validate, create);
router.put('/:id', protect, updateFaqValidator, validate, update);
router.delete('/:id', protect, remove);

module.exports = router;
