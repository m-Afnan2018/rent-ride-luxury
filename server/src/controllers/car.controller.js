const Car = require('../models/Car');
const { sendSuccess, sendError } = require('../utils/response');
const { paginate, buildPaginationMeta } = require('../utils/pagination');
const { generateUniqueSlug } = require('../utils/slugify');

const populateFields = [
  { path: 'brand_id', select: 'name slug image' },
  { path: 'type_id', select: 'name slug' },
  { path: 'category_id', select: 'name slug' },
];

const getAll = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const filter = {};
    if (req.query.brand) filter.brand_id = req.query.brand;
    if (req.query.type) filter.type_id = req.query.type;
    if (req.query.category) filter.category_id = req.query.category;
    if (req.query.fuel_type) filter.fuel_type = req.query.fuel_type;
    if (req.query.availability) filter.availability_status = req.query.availability;
    if (req.query.transmission) filter.transmission = req.query.transmission;
    if (req.query.is_featured) filter.is_featured = req.query.is_featured === 'true';

    const [cars, total] = await Promise.all([
      Car.find(filter).populate(populateFields).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Car.countDocuments(filter),
    ]);
    return sendSuccess(res, cars, 'Cars fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) {
    next(err);
  }
};

const getBySlug = async (req, res, next) => {
  try {
    const car = await Car.findOne({ slug: req.params.slug }).populate(populateFields);
    if (!car) return sendError(res, 'Car not found', 404);
    return sendSuccess(res, car, 'Car fetched');
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id).populate(populateFields);
    if (!car) return sendError(res, 'Car not found', 404);
    return sendSuccess(res, car, 'Car fetched');
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const slug = await generateUniqueSlug(Car, req.body.name);
    const car = await Car.create({ ...req.body, slug });
    return sendSuccess(res, car, 'Car created', 201);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return sendError(res, 'Car not found', 404);

    if (req.body.name && req.body.name !== car.name) {
      req.body.slug = await generateUniqueSlug(Car, req.body.name, car._id);
    }

    const updated = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate(populateFields);
    return sendSuccess(res, updated, 'Car updated');
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return sendError(res, 'Car not found', 404);
    return sendSuccess(res, null, 'Car deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getBySlug, getById, create, update, remove };
