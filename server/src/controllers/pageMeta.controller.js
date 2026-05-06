const PageMeta = require('../models/PageMeta');
const { sendSuccess, sendError } = require('../utils/response');
const { paginate, buildPaginationMeta } = require('../utils/pagination');

const getAll = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const [items, total] = await Promise.all([
      PageMeta.find().skip(skip).limit(limit).sort({ url: 1 }),
      PageMeta.countDocuments(),
    ]);
    return sendSuccess(res, items, 'Page metas fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) {
    next(err);
  }
};

const getByUrl = async (req, res, next) => {
  try {
    const item = await PageMeta.findOne({ url: req.query.url });
    if (!item) return sendError(res, 'Page meta not found', 404);
    return sendSuccess(res, item, 'Page meta fetched');
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const item = await PageMeta.findById(req.params.id);
    if (!item) return sendError(res, 'Page meta not found', 404);
    return sendSuccess(res, item, 'Page meta fetched');
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const item = await PageMeta.create(req.body);
    return sendSuccess(res, item, 'Page meta created', 201);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const item = await PageMeta.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return sendError(res, 'Page meta not found', 404);
    return sendSuccess(res, item, 'Page meta updated');
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const item = await PageMeta.findByIdAndDelete(req.params.id);
    if (!item) return sendError(res, 'Page meta not found', 404);
    return sendSuccess(res, null, 'Page meta deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getByUrl, getOne, create, update, remove };
