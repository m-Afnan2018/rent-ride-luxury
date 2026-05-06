const router = require('express').Router();
const { getAll, getOne, create, update, remove } = require('../controllers/category.controller');
const { protect } = require('../middlewares/auth.middleware');
const { createCategoryValidator, updateCategoryValidator } = require('../utils/validators/category.validator');
const validate = require('../middlewares/validate.middleware');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protect, createCategoryValidator, validate, create);
router.put('/:id', protect, updateCategoryValidator, validate, update);
router.delete('/:id', protect, remove);

module.exports = router;
