const Testimonial = require('../models/Testimonial');
const { sendSuccess, sendError } = require('../utils/response');
const { paginate, buildPaginationMeta } = require('../utils/pagination');

const getAll = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const filter = { status: 'approved' };
    if (req.query.is_featured) filter.is_featured = req.query.is_featured === 'true';

    const [items, total] = await Promise.all([
      Testimonial.find(filter).populate('car_id', 'name slug feature_image').skip(skip).limit(limit).sort({ createdAt: -1 }),
      Testimonial.countDocuments(filter),
    ]);
    return sendSuccess(res, items, 'Testimonials fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) {
    next(err);
  }
};

const getAllAdmin = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const [items, total] = await Promise.all([
      Testimonial.find(filter).populate('car_id', 'name slug feature_image').skip(skip).limit(limit).sort({ createdAt: -1 }),
      Testimonial.countDocuments(filter),
    ]);
    return sendSuccess(res, items, 'Testimonials fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const item = await Testimonial.findById(req.params.id).populate('car_id', 'name slug');
    if (!item) return sendError(res, 'Testimonial not found', 404);
    return sendSuccess(res, item, 'Testimonial fetched');
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const item = await Testimonial.create(req.body);
    return sendSuccess(res, item, 'Testimonial created', 201);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return sendError(res, 'Testimonial not found', 404);
    return sendSuccess(res, item, 'Testimonial updated');
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) return sendError(res, 'Testimonial not found', 404);
    return sendSuccess(res, null, 'Testimonial deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getAllAdmin, getOne, create, update, remove };
