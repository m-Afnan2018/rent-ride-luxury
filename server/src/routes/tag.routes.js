const router = require('express').Router();
const { getAll, getOne, create, update, remove } = require('../controllers/tag.controller');
const { protect } = require('../middlewares/auth.middleware');
const { createTagValidator, updateTagValidator } = require('../utils/validators/tag.validator');
const validate = require('../middlewares/validate.middleware');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protect, createTagValidator, validate, create);
router.put('/:id', protect, updateTagValidator, validate, update);
router.delete('/:id', protect, remove);

module.exports = router;
