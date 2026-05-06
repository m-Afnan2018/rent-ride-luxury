const path = require('path');
const fs = require('fs');
const Media = require('../models/Media');
const { sendSuccess, sendError } = require('../utils/response');
const { paginate, buildPaginationMeta } = require('../utils/pagination');

const getAll = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const filter = {};
    if (req.query.entity_type) filter.entity_type = req.query.entity_type;
    if (req.query.entity_id) filter.entity_id = req.query.entity_id;
    if (req.query.type) filter.type = req.query.type;

    const [items, total] = await Promise.all([
      Media.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Media.countDocuments(filter),
    ]);
    return sendSuccess(res, items, 'Media fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const item = await Media.findById(req.params.id);
    if (!item) return sendError(res, 'Media not found', 404);
    return sendSuccess(res, item, 'Media fetched');
  } catch (err) {
    next(err);
  }
};

const upload = async (req, res, next) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);

    const { entity_type = 'general', entity_id } = req.body;
    const isVideo = req.file.mimetype.startsWith('video/');
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const relPath = req.file.path.replace(/\\/g, '/');
    const url = `${baseUrl}/${relPath}`;

    const media = await Media.create({
      name: req.file.originalname,
      type: isVideo ? 'video' : 'image',
      size: req.file.size,
      url,
      mime_type: req.file.mimetype,
      entity_type,
      entity_id: entity_id || null,
    });

    return sendSuccess(res, media, 'File uploaded', 201);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const item = await Media.findByIdAndDelete(req.params.id);
    if (!item) return sendError(res, 'Media not found', 404);

    const filePath = path.join(__dirname, '../../../', item.url.replace(/^https?:\/\/[^/]+\//, ''));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return sendSuccess(res, null, 'Media deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getOne, upload, remove };
