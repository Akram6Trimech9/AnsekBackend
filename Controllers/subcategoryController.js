const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Subcategory = require('../Models/Subcategory');
const slugify = require('../utils/slugify');

const createSubcategory = asyncHandler(async (req, res) => {
  const { category, name, description } = req.body;
  if (!category || !name) throw new ApiError('Category and name are required', 400);
  const slug = slugify(name);
  const subcat = await Subcategory.create({ category, name, slug, description });
  res.status(201).json({ success: true, message: 'Subcategory created', data: subcat });
});

const getSubcategories = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const subcats = await Subcategory.find(filter).populate('category');
  res.json({ success: true, data: subcats });
});

const getSubcategoryBySlug = asyncHandler(async (req, res) => {
  const subcat = await Subcategory.findOne({ slug: req.params.slug }).populate('category');
  if (!subcat) throw new ApiError('Subcategory not found', 404);
  res.json({ success: true, data: subcat });
});

const updateSubcategory = asyncHandler(async (req, res) => {
  const subcat = await Subcategory.findById(req.params.id);
  if (!subcat) throw new ApiError('Subcategory not found', 404);
  const update = {};
  if (req.body.name) update.name = req.body.name, update.slug = slugify(req.body.name);
  if (req.body.description) update.description = req.body.description;
  if (req.body.category) update.category = req.body.category;
  const updated = await Subcategory.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json({ success: true, message: 'Subcategory updated', data: updated });
});

const deleteSubcategory = asyncHandler(async (req, res) => {
  const subcat = await Subcategory.findById(req.params.id);
  if (!subcat) throw new ApiError('Subcategory not found', 404);
  await Subcategory.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Subcategory deleted' });
});

module.exports = { createSubcategory, getSubcategories, getSubcategoryBySlug, updateSubcategory, deleteSubcategory };
