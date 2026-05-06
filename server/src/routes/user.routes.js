const router = require('express').Router();
const { getAll, getOne, getMe, create, update, changePassword, remove } = require('../controllers/user.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const { createUserValidator, updateUserValidator } = require('../utils/validators/user.validator');
const validate = require('../middlewares/validate.middleware');

router.use(protect);

router.get('/me', getMe);
router.put('/me/password', changePassword);

router.get('/', authorize('admin'), getAll);
router.post('/', authorize('admin'), createUserValidator, validate, create);
router.get('/:id', authorize('admin'), getOne);
router.put('/:id', authorize('admin'), updateUserValidator, validate, update);
router.delete('/:id', authorize('admin'), remove);

module.exports = router;
