const express = require('express');
const { createSubcategory, getSubcategories, getSubcategoryBySlug, updateSubcategory, deleteSubcategory } = require('../Controllers/subcategoryController');
const { protect } = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', getSubcategories);
router.get('/:slug', getSubcategoryBySlug);
router.post('/', protect, admin, createSubcategory);
router.put('/:id', protect, admin, updateSubcategory);
router.delete('/:id', protect, admin, deleteSubcategory);

module.exports = router;
