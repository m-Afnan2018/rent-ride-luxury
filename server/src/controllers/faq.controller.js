const FAQ = require('../models/FAQ');
const { sendSuccess, sendError } = require('../utils/response');
const { paginate, buildPaginationMeta } = require('../utils/pagination');

const getAll = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const filter = { is_active: true };

    const [items, total] = await Promise.all([
      FAQ.find(filter).skip(skip).limit(limit).sort({ order: 1, createdAt: 1 }),
      FAQ.countDocuments(filter),
    ]);
    return sendSuccess(res, items, 'FAQs fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) {
    next(err);
  }
};

const getAllAdmin = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const filter = {};
    if (req.query.is_active !== undefined) filter.is_active = req.query.is_active === 'true';

    const [items, total] = await Promise.all([
      FAQ.find(filter).skip(skip).limit(limit).sort({ order: 1, createdAt: 1 }),
      FAQ.countDocuments(filter),
    ]);
    return sendSuccess(res, items, 'FAQs fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const item = await FAQ.findById(req.params.id);
    if (!item) return sendError(res, 'FAQ not found', 404);
    return sendSuccess(res, item, 'FAQ fetched');
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const item = await FAQ.create(req.body);
    return sendSuccess(res, item, 'FAQ created', 201);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const item = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return sendError(res, 'FAQ not found', 404);
    return sendSuccess(res, item, 'FAQ updated');
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const item = await FAQ.findByIdAndDelete(req.params.id);
    if (!item) return sendError(res, 'FAQ not found', 404);
    return sendSuccess(res, null, 'FAQ deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getAllAdmin, getOne, create, update, remove };
