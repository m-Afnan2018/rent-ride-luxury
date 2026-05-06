const jwt = require('jsonwebtoken');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const { sendSuccess, sendError } = require('../utils/response');

const generateAccessToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email_id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
  );

const generateRefreshToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  });

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email_id: email, status: 'active' });
    if (!user) return sendError(res, 'Invalid credentials', 401);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return sendError(res, 'Invalid credentials', 401);

    const accessToken = generateAccessToken(user);
    const refreshTokenStr = generateRefreshToken(user);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await RefreshToken.create({ token: refreshTokenStr, user_id: user._id, expires_at: expiresAt });

    return sendSuccess(res, { access_token: accessToken, refresh_token: refreshTokenStr, user }, 'Login successful');
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    const stored = await RefreshToken.findOne({ token: refresh_token, is_revoked: false });
    if (!stored || stored.expires_at < new Date()) {
      return sendError(res, 'Invalid or expired refresh token', 401);
    }

    let decoded;
    try {
      decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
    } catch {
      return sendError(res, 'Invalid refresh token', 401);
    }

    const user = await User.findById(decoded.id);
    if (!user || user.status !== 'active') return sendError(res, 'User not found or inactive', 401);

    return sendSuccess(res, { access_token: generateAccessToken(user) }, 'Token refreshed');
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    if (refresh_token) {
      await RefreshToken.findOneAndUpdate({ token: refresh_token }, { is_revoked: true });
    }
    return sendSuccess(res, null, 'Logged out successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = { login, refresh, logout };
