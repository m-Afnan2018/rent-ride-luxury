const router = require('express').Router();
const { getAll, getAllAdmin, getBySlug, getById, create, update, remove } = require('../controllers/blog.controller');
const { protect } = require('../middlewares/auth.middleware');
const { createBlogValidator, updateBlogValidator } = require('../utils/validators/blog.validator');
const validate = require('../middlewares/validate.middleware');

// Public
router.get('/', getAll);
router.get('/slug/:slug', getBySlug);

// Protected
router.get('/admin/all', protect, getAllAdmin);
router.get('/:id', protect, getById);
router.post('/', protect, createBlogValidator, validate, create);
router.put('/:id', protect, updateBlogValidator, validate, update);
router.delete('/:id', protect, remove);

module.exports = router;
