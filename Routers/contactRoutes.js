const express = require('express');
const { createContact, getContacts, markAsRead, deleteContact } = require('../Controllers/contactController');
const { validateContact } = require('../validations/validators');
const { protect } = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

const router = express.Router();

router.post('/', validateContact, createContact);
router.get('/', protect, admin, getContacts);
router.patch('/:id/read', protect, admin, markAsRead);
router.delete('/:id', protect, admin, deleteContact);

module.exports = router;
