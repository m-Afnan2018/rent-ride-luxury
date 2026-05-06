const slugifyLib = require('slugify');

const generateSlug = (text) =>
  slugifyLib(text, { lower: true, strict: true, trim: true });

const generateUniqueSlug = async (Model, text, excludeId = null) => {
  const base = generateSlug(text);
  let slug = base;
  let counter = 1;

  while (true) {
    const query = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const existing = await Model.findOne(query);
    if (!existing) break;
    slug = `${base}-${counter++}`;
  }

  return slug;
};

module.exports = { generateSlug, generateUniqueSlug };
