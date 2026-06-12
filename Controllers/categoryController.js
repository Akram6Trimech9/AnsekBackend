const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Category = require('../Models/Category');
const slugify = require('../utils/slugify');
const { deleteFile } = require('../utils/fileHelper');

const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) throw new ApiError('Name is required', 400);
  const slug = slugify(name);
  const image = req.file ? req.file.path.replace(/\\/g, '/') : null;
  const cat = await Category.create({ name, slug, description, image });
  res.status(201).json({ success: true, message: 'Category created', data: cat });
});

const getCategories = asyncHandler(async (req, res) => {
  const cats = await Category.find();
  res.json({ success: true, data: cats });
});

const getCategoryBySlug = asyncHandler(async (req, res) => {
  const cat = await Category.findOne({ slug: req.params.slug });
  if (!cat) throw new ApiError('Category not found', 404);
  res.json({ success: true, data: cat });
});

const updateCategory = asyncHandler(async (req, res) => {
  const cat = await Category.findById(req.params.id);
  if (!cat) throw new ApiError('Category not found', 404);
  const update = {};
  if (req.body.name) update.name = req.body.name, update.slug = slugify(req.body.name);
  if (req.body.description) update.description = req.body.description;
  if (req.file) update.image = req.file.path.replace(/\\/g, '/');
  const updated = await Category.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json({ success: true, message: 'Category updated', data: updated });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const cat = await Category.findById(req.params.id);
  if (!cat) throw new ApiError('Category not found', 404);
  if (cat.image) deleteFile(cat.image);
  await Category.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Category deleted' });
});

module.exports = { createCategory, getCategories, getCategoryBySlug, updateCategory, deleteCategory };
