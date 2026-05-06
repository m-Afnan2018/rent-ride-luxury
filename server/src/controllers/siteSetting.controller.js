const SiteSetting = require('../models/SiteSetting');
const { sendSuccess } = require('../utils/response');

const get = async (req, res, next) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) settings = await SiteSetting.create({});
    return sendSuccess(res, settings, 'Site settings fetched');
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(req.body);
    } else {
      settings = await SiteSetting.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
    }
    return sendSuccess(res, settings, 'Site settings updated');
  } catch (err) {
    next(err);
  }
};

module.exports = { get, update };
