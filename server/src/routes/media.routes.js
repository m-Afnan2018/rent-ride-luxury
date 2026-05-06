const router = require('express').Router();
const { getAll, getOne, upload: uploadMedia, remove } = require('../controllers/media.controller');
const { protect } = require('../middlewares/auth.middleware');
const { createMediaValidator } = require('../utils/validators/media.validator');
const validate = require('../middlewares/validate.middleware');
const upload = require('../config/multer');

router.use(protect);

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', upload.single('file'), createMediaValidator, validate, uploadMedia);
router.delete('/:id', remove);

module.exports = router;
