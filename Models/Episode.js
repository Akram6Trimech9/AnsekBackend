const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  audioFile: { type: String },
  thumbnail: { type: String },
  duration: { type: Number },
  episodeNumber: { type: Number },
  guestName: { type: String },
  tags: [{ type: String }],
  publishDate: { type: Date, default: Date.now },
  isFeatured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Episode', episodeSchema);
