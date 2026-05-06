const router = require('express').Router();
const { getAll, getOne, create, update, remove } = require('../controllers/lead.controller');
const { protect } = require('../middlewares/auth.middleware');
const { createLeadValidator, updateLeadValidator } = require('../utils/validators/lead.validator');
const validate = require('../middlewares/validate.middleware');
const rateLimit = require('express-rate-limit');

const leadLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10, message: { success: false, message: 'Too many enquiries submitted, please try again later' } });

// Public
router.post('/', leadLimiter, createLeadValidator, validate, create);

// Protected
router.get('/', protect, getAll);
router.get('/:id', protect, getOne);
router.put('/:id', protect, updateLeadValidator, validate, update);
router.delete('/:id', protect, remove);

module.exports = router;
