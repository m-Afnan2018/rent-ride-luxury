const Category = require('../models/Category');
const { sendSuccess, sendError } = require('../utils/response');
const { paginate, buildPaginationMeta } = require('../utils/pagination');
const { generateUniqueSlug } = require('../utils/slugify');

const getAll = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const [items, total] = await Promise.all([
      Category.find().skip(skip).limit(limit).sort({ name: 1 }),
      Category.countDocuments(),
    ]);
    return sendSuccess(res, items, 'Categorys fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) { next(err); }
};

const getOne = async (req, res, next) => {
  try {
    const item = await Category.findById(req.params.id);
    if (!item) return sendError(res, 'Category not found', 404);
    return sendSuccess(res, item, 'Category fetched');
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const slug = await generateUniqueSlug(Category, req.body.name);
    const item = await Category.create({ ...req.body, slug });
    return sendSuccess(res, item, 'Category created', 201);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const item = await Category.findById(req.params.id);
    if (!item) return sendError(res, 'Category not found', 404);
    if (req.body.name && req.body.name !== item.name) {
      req.body.slug = await generateUniqueSlug(Category, req.body.name, item._id);
    }
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return sendSuccess(res, updated, 'Category updated');
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const item = await Category.findByIdAndDelete(req.params.id);
    if (!item) return sendError(res, 'Category not found', 404);
    return sendSuccess(res, null, 'Category deleted');
  } catch (err) { next(err); }
};

module.exports = { getAll, getOne, create, update, remove };
