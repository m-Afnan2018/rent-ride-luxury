const router = require('express').Router();
const { getAll, getByUrl, getOne, create, update, remove } = require('../controllers/pageMeta.controller');
const { protect } = require('../middlewares/auth.middleware');
const { createPageMetaValidator, updatePageMetaValidator, getByUrlValidator } = require('../utils/validators/pageMeta.validator');
const validate = require('../middlewares/validate.middleware');

// Public
router.get('/', getByUrlValidator, validate, getByUrl);

// Protected
router.get('/all', protect, getAll);
router.get('/:id', protect, getOne);
router.post('/', protect, createPageMetaValidator, validate, create);
router.put('/:id', protect, updatePageMetaValidator, validate, update);
router.delete('/:id', protect, remove);

module.exports = router;
