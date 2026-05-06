const Type = require('../models/Type');
const { sendSuccess, sendError } = require('../utils/response');
const { paginate, buildPaginationMeta } = require('../utils/pagination');
const { generateUniqueSlug } = require('../utils/slugify');

const getAll = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const [items, total] = await Promise.all([
      Type.find().skip(skip).limit(limit).sort({ name: 1 }),
      Type.countDocuments(),
    ]);
    return sendSuccess(res, items, 'Types fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) { next(err); }
};

const getOne = async (req, res, next) => {
  try {
    const item = await Type.findById(req.params.id);
    if (!item) return sendError(res, 'Type not found', 404);
    return sendSuccess(res, item, 'Type fetched');
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const slug = await generateUniqueSlug(Type, req.body.name);
    const item = await Type.create({ ...req.body, slug });
    return sendSuccess(res, item, 'Type created', 201);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const item = await Type.findById(req.params.id);
    if (!item) return sendError(res, 'Type not found', 404);
    if (req.body.name && req.body.name !== item.name) {
      req.body.slug = await generateUniqueSlug(Type, req.body.name, item._id);
    }
    const updated = await Type.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return sendSuccess(res, updated, 'Type updated');
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const item = await Type.findByIdAndDelete(req.params.id);
    if (!item) return sendError(res, 'Type not found', 404);
    return sendSuccess(res, null, 'Type deleted');
  } catch (err) { next(err); }
};

module.exports = { getAll, getOne, create, update, remove };
