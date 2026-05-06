const router = require('express').Router();
const { getAll, getOne, create, update, remove } = require('../controllers/type.controller');
const { protect } = require('../middlewares/auth.middleware');
const { createTypeValidator, updateTypeValidator } = require('../utils/validators/type.validator');
const validate = require('../middlewares/validate.middleware');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protect, createTypeValidator, validate, create);
router.put('/:id', protect, updateTypeValidator, validate, update);
router.delete('/:id', protect, remove);

module.exports = router;
