const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');
const { paginate, buildPaginationMeta } = require('../utils/pagination');

const getAll = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.status) filter.status = req.query.status;

    const [users, total] = await Promise.all([
      User.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      User.countDocuments(filter),
    ]);
    return sendSuccess(res, users, 'Users fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return sendError(res, 'User not found', 404);
    return sendSuccess(res, user, 'User fetched');
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return sendError(res, 'User not found', 404);
    return sendSuccess(res, user, 'Profile fetched');
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, email_id, password, role, phone_number } = req.body;
    const existing = await User.findOne({ email_id });
    if (existing) return sendError(res, 'Email already in use', 400);
    const user = await User.create({ name, email_id, password_hash: password, role, phone_number });
    return sendSuccess(res, user, 'User created', 201);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const allowed = ['name', 'email_id', 'role', 'status', 'phone_number', 'display_picture'];
    const updates = {};
    allowed.forEach((k) => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!user) return sendError(res, 'User not found', 404);
    return sendSuccess(res, user, 'User updated');
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { current_password, new_password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return sendError(res, 'User not found', 404);

    const isMatch = await user.comparePassword(current_password);
    if (!isMatch) return sendError(res, 'Current password is incorrect', 400);

    user.password_hash = new_password;
    await user.save();
    return sendSuccess(res, null, 'Password updated');
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) return sendError(res, 'Cannot delete your own account', 400);
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return sendError(res, 'User not found', 404);
    return sendSuccess(res, null, 'User deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getOne, getMe, create, update, changePassword, remove };
