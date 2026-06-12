const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Contact = require('../Models/Contact');

const createContact = asyncHandler(async (req, res) => {
  const { fullName, email, phone, subject, message } = req.body;
  if (!fullName || !email || !message) throw new ApiError('Name, email, and message are required', 400);
  const contact = await Contact.create({ fullName, email, phone, subject, message, status: 'new' });
  res.status(201).json({ success: true, message: 'Message sent successfully', data: contact });
});

const getContacts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const skip = (page - 1) * limit;
  const filter = status ? { status } : {};
  const contacts = await Contact.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
  const total = await Contact.countDocuments(filter);
  res.json({ success: true, data: contacts, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

const markAsRead = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) throw new ApiError('Message not found', 404);
  contact.status = 'read';
  await contact.save();
  res.json({ success: true, message: 'Marked as read', data: contact });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) throw new ApiError('Message not found', 404);
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Message deleted' });
});

module.exports = { createContact, getContacts, markAsRead, deleteContact };
