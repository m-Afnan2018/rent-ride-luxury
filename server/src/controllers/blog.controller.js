const Blog = require('../models/Blog');
const BlogTag = require('../models/BlogTag');
const { sendSuccess, sendError } = require('../utils/response');
const { paginate, buildPaginationMeta } = require('../utils/pagination');
const { generateUniqueSlug } = require('../utils/slugify');

const attachTags = async (blogDoc) => {
  const blogTags = await BlogTag.find({ blog_id: blogDoc._id }).populate('tag_id', 'name slug');
  return { ...blogDoc.toJSON(), tags: blogTags.map((bt) => bt.tag_id) };
};

const getAll = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const filter = { status: 'published' };

    if (req.query.tag) {
      const tagBlogs = await BlogTag.find({ tag_id: req.query.tag }).select('blog_id');
      filter._id = { $in: tagBlogs.map((bt) => bt.blog_id) };
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter).populate('author_id', 'name display_picture').skip(skip).limit(limit).sort({ createdAt: -1 }),
      Blog.countDocuments(filter),
    ]);
    return sendSuccess(res, blogs, 'Blogs fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) {
    next(err);
  }
};

const getAllAdmin = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate({}, req.query);
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.tag) {
      const tagBlogs = await BlogTag.find({ tag_id: req.query.tag }).select('blog_id');
      filter._id = { $in: tagBlogs.map((bt) => bt.blog_id) };
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter).populate('author_id', 'name display_picture').skip(skip).limit(limit).sort({ createdAt: -1 }),
      Blog.countDocuments(filter),
    ]);
    return sendSuccess(res, blogs, 'Blogs fetched', 200, buildPaginationMeta(total, page, limit));
  } catch (err) {
    next(err);
  }
};

const getBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' }).populate('author_id', 'name display_picture');
    if (!blog) return sendError(res, 'Blog not found', 404);
    return sendSuccess(res, await attachTags(blog), 'Blog fetched');
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author_id', 'name display_picture');
    if (!blog) return sendError(res, 'Blog not found', 404);
    return sendSuccess(res, await attachTags(blog), 'Blog fetched');
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const slug = await generateUniqueSlug(Blog, req.body.title);
    const { tags, ...data } = req.body;
    const blog = await Blog.create({ ...data, slug, author_id: req.user.id });

    if (Array.isArray(tags) && tags.length > 0) {
      await BlogTag.insertMany(tags.map((tag_id) => ({ blog_id: blog._id, tag_id })));
    }
    return sendSuccess(res, await attachTags(blog), 'Blog created', 201);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return sendError(res, 'Blog not found', 404);

    const { tags, ...data } = req.body;
    if (data.title && data.title !== blog.title) {
      data.slug = await generateUniqueSlug(Blog, data.title, blog._id);
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true }).populate('author_id', 'name display_picture');

    if (tags !== undefined) {
      await BlogTag.deleteMany({ blog_id: blog._id });
      if (Array.isArray(tags) && tags.length > 0) {
        await BlogTag.insertMany(tags.map((tag_id) => ({ blog_id: blog._id, tag_id })));
      }
    }
    return sendSuccess(res, await attachTags(updated), 'Blog updated');
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return sendError(res, 'Blog not found', 404);
    await BlogTag.deleteMany({ blog_id: blog._id });
    return sendSuccess(res, null, 'Blog deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getAllAdmin, getBySlug, getById, create, update, remove };
