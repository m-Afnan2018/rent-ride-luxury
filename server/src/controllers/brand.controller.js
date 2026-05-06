const Brand = require('../models/Brand');
const { sendSuccess, sendError } = require('../utils/response');
const { paginate, buildPaginationMeta } = require('../utils/pagination');
const { generateUniqueSlug } = require('../utils/slugify');

const getAll = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const [items, total] = await Promise.all([
      Brand.find().skip(skip).limit(limit).sort({ name: 1 }),
      Brand.countDocuments(),
    ]);
    return sendSuccess(res, items, 'Brands fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) { next(err); }
};

const getOne = async (req, res, next) => {
  try {
    const item = await Brand.findById(req.params.id);
    if (!item) return sendError(res, 'Brand not found', 404);
    return sendSuccess(res, item, 'Brand fetched');
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const slug = await generateUniqueSlug(Brand, req.body.name);
    const item = await Brand.create({ ...req.body, slug });
    return sendSuccess(res, item, 'Brand created', 201);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const item = await Brand.findById(req.params.id);
    if (!item) return sendError(res, 'Brand not found', 404);
    if (req.body.name && req.body.name !== item.name) {
      req.body.slug = await generateUniqueSlug(Brand, req.body.name, item._id);
    }
    const updated = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return sendSuccess(res, updated, 'Brand updated');
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const item = await Brand.findByIdAndDelete(req.params.id);
    if (!item) return sendError(res, 'Brand not found', 404);
    return sendSuccess(res, null, 'Brand deleted');
  } catch (err) { next(err); }
};

module.exports = { getAll, getOne, create, update, remove };
