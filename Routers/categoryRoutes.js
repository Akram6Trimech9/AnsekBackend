const express = require('express');
const multer = require('multer');
const { storageFor, imageFilter, limits } = require('../Config/multerConfig');
const { createCategory, getCategories, getCategoryBySlug, updateCategory, deleteCategory } = require('../Controllers/categoryController');
const { protect } = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

const router = express.Router();
const upload = multer({ storage: storageFor('news'), fileFilter: imageFilter, limits });

router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);
router.post('/', protect, admin, upload.single('image'), createCategory);
router.put('/:id', protect, admin, upload.single('image'), updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;
