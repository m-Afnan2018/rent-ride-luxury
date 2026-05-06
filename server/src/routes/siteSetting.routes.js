const router = require('express').Router();
const { get, update } = require('../controllers/siteSetting.controller');
const { protect } = require('../middlewares/auth.middleware');
const { updateSiteSettingValidator } = require('../utils/validators/siteSetting.validator');
const validate = require('../middlewares/validate.middleware');

// Public
router.get('/', get);

// Protected
router.put('/', protect, updateSiteSettingValidator, validate, update);

module.exports = router;
