const router = require('express').Router();
const { getAll, getOne, create, update, remove } = require('../controllers/brand.controller');
const { protect } = require('../middlewares/auth.middleware');
const { createBrandValidator, updateBrandValidator } = require('../utils/validators/brand.validator');
const validate = require('../middlewares/validate.middleware');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protect, createBrandValidator, validate, create);
router.put('/:id', protect, updateBrandValidator, validate, update);
router.delete('/:id', protect, remove);

module.exports = router;
