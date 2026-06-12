const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Article = require('../Models/Article');
const slugify = require('../utils/slugify');
const { deleteFile } = require('../utils/fileHelper');

const createArticle = asyncHandler(async (req, res) => {
  const { title, shortDescription, fullDescription, content, category, subCategory, tags, isFeatured, status, metaTitle, metaDescription, keywords } = req.body;
  if (!title || !content) throw new ApiError('Title and content are required', 400);
  const slug = slugify(title);
  const featuredImage = req.files && req.files.featuredImage ? req.files.featuredImage[0].path.replace(/\\/g, '/') : null;
  const galleryImages = req.files && req.files.galleryImages ? req.files.galleryImages.map(f => f.path.replace(/\\/g, '/')) : [];
  const article = await Article.create({
    title, slug, shortDescription, fullDescription, content, category, subCategory, tags: tags ? tags.split(',') : [], featuredImage, galleryImages,
    author: req.user.id, isFeatured: isFeatured === 'true', status: status || 'draft', metaTitle, metaDescription, keywords: keywords ? keywords.split(',') : [],
  });
  res.status(201).json({ success: true, message: 'Article created successfully', data: article });
});

const getArticles = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category, status = 'published', search } = req.query;
  const skip = (page - 1) * limit;
  const filter = { status };
  if (category) filter.category = category;
  if (search) filter.$or = [{ title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } }];
  const articles = await Article.find(filter).populate('author category subCategory').skip(skip).limit(limit);
  const total = await Article.countDocuments(filter);
  res.json({ success: true, data: articles, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

const getArticleBySlug = asyncHandler(async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug }).populate('author category subCategory');
  if (!article) throw new ApiError('Article not found', 404);
  article.views = (article.views || 0) + 1;
  await article.save();
  res.json({ success: true, data: article });
});

const updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) throw new ApiError('Article not found', 404);
  if (article.author.toString() !== req.user.id && req.user.role !== 'admin') throw new ApiError('Not authorized', 403);
  const update = { ...req.body };
  if (req.body.title) update.slug = slugify(req.body.title);
  const updated = await Article.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json({ success: true, message: 'Article updated', data: updated });
});

const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) throw new ApiError('Article not found', 404);
  if (article.author.toString() !== req.user.id && req.user.role !== 'admin') throw new ApiError('Not authorized', 403);
  if (article.featuredImage) deleteFile(article.featuredImage);
  article.galleryImages.forEach(img => deleteFile(img));
  await Article.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Article deleted' });
});

const getTrendingArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({ status: 'published' }).sort({ views: -1 }).limit(10);
  res.json({ success: true, data: articles });
});

const getFeaturedArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({ isFeatured: true, status: 'published' }).limit(5);
  res.json({ success: true, data: articles });
});

module.exports = { createArticle, getArticles, getArticleBySlug, updateArticle, deleteArticle, getTrendingArticles, getFeaturedArticles };
