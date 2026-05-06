const Tag = require('../models/Tag');
const { sendSuccess, sendError } = require('../utils/response');
const { paginate, buildPaginationMeta } = require('../utils/pagination');
const { generateUniqueSlug } = require('../utils/slugify');

const getAll = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const [items, total] = await Promise.all([
      Tag.find().skip(skip).limit(limit).sort({ name: 1 }),
      Tag.countDocuments(),
    ]);
    return sendSuccess(res, items, 'Tags fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) { next(err); }
};

const getOne = async (req, res, next) => {
  try {
    const item = await Tag.findById(req.params.id);
    if (!item) return sendError(res, 'Tag not found', 404);
    return sendSuccess(res, item, 'Tag fetched');
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const slug = await generateUniqueSlug(Tag, req.body.name);
    const item = await Tag.create({ ...req.body, slug });
    return sendSuccess(res, item, 'Tag created', 201);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const item = await Tag.findById(req.params.id);
    if (!item) return sendError(res, 'Tag not found', 404);
    if (req.body.name && req.body.name !== item.name) {
      req.body.slug = await generateUniqueSlug(Tag, req.body.name, item._id);
    }
    const updated = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return sendSuccess(res, updated, 'Tag updated');
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const item = await Tag.findByIdAndDelete(req.params.id);
    if (!item) return sendError(res, 'Tag not found', 404);
    return sendSuccess(res, null, 'Tag deleted');
  } catch (err) { next(err); }
};

module.exports = { getAll, getOne, create, update, remove };
