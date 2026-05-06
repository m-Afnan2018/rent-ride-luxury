const router = require('express').Router();
const { login, refresh, logout } = require('../controllers/auth.controller');
const { loginValidator, refreshValidator } = require('../utils/validators/auth.validator');
const validate = require('../middlewares/validate.middleware');
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { success: false, message: 'Too many attempts, please try again later' } });

router.post('/login', authLimiter, loginValidator, validate, login);
router.post('/refresh', refreshValidator, validate, refresh);
router.post('/logout', logout);

module.exports = router;
