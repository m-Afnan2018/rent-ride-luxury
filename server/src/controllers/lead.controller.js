const Lead = require('../models/Lead');
const { sendSuccess, sendError } = require('../utils/response');
const { paginate, buildPaginationMeta } = require('../utils/pagination');

const getAll = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.source) filter.source = req.query.source;
    if (req.query.assigned_to) filter.assigned_to = req.query.assigned_to;

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .populate('car_id', 'name slug feature_image')
        .populate('assigned_to', 'name email_id')
        .skip(skip).limit(limit).sort({ createdAt: -1 }),
      Lead.countDocuments(filter),
    ]);
    return sendSuccess(res, leads, 'Leads fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('car_id', 'name slug feature_image')
      .populate('assigned_to', 'name email_id');
    if (!lead) return sendError(res, 'Lead not found', 404);
    return sendSuccess(res, lead, 'Lead fetched');
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const lead = await Lead.create(req.body);
    return sendSuccess(res, lead, 'Enquiry submitted successfully', 201);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('car_id', 'name slug feature_image')
      .populate('assigned_to', 'name email_id');
    if (!lead) return sendError(res, 'Lead not found', 404);
    return sendSuccess(res, lead, 'Lead updated');
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return sendError(res, 'Lead not found', 404);
    return sendSuccess(res, null, 'Lead deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getOne, create, update, remove };
