const express = require('express');
const multer = require('multer');
const { storageFor, imageFilter, limits } = require('../Config/multerConfig');
const { createArticle, getArticles, getArticleBySlug, updateArticle, deleteArticle, getTrendingArticles, getFeaturedArticles } = require('../Controllers/articleController');
const { validateArticle } = require('../validations/validators');
const { protect } = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

const router = express.Router();
const upload = multer({ storage: storageFor('news'), fileFilter: imageFilter, limits });

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get all articles with pagination and filtering
 *     tags: [News]
 *     parameters:
 *       - name: page
 *         in: query
 *         type: integer
 *       - name: limit
 *         in: query
 *         type: integer
 *       - name: category
 *         in: query
 *         type: string
 *       - name: search
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Articles list
 */
router.get('/', getArticles);

/**
 * @swagger
 * /api/news/trending:
 *   get:
 *     summary: Get trending articles
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Trending articles
 */
router.get('/trending', getTrendingArticles);

/**
 * @swagger
 * /api/news/featured:
 *   get:
 *     summary: Get featured articles
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Featured articles
 */
router.get('/featured', getFeaturedArticles);

/**
 * @swagger
 * /api/news/{slug}:
 *   get:
 *     summary: Get article by slug
 *     tags: [News]
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Article details
 */
router.get('/:slug', getArticleBySlug);

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Create article
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article created
 */
router.post('/', protect, upload.fields([{ name: 'featuredImage' }, { name: 'galleryImages', maxCount: 5 }]), validateArticle, createArticle);

/**
 * @swagger
 * /api/news/{id}:
 *   put:
 *     summary: Update article
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Article updated
 */
router.put('/:id', protect, upload.fields([{ name: 'featuredImage' }, { name: 'galleryImages', maxCount: 5 }]), updateArticle);

/**
 * @swagger
 * /api/news/{id}:
 *   delete:
 *     summary: Delete article
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Article deleted
 */
router.delete('/:id', protect, deleteArticle);

module.exports = router;
