const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Episode = require('../Models/Episode');
const slugify = require('../utils/slugify');
const { deleteFile } = require('../utils/fileHelper');

const createEpisode = asyncHandler(async (req, res) => {
  const { title, description, episodeNumber, guestName, tags, isFeatured, duration } = req.body;
  if (!title) throw new ApiError('Title is required', 400);
  const slug = slugify(title);
  const audioFile = req.files && req.files.audioFile ? req.files.audioFile[0].path.replace(/\\/g, '/') : null;
  const thumbnail = req.files && req.files.thumbnail ? req.files.thumbnail[0].path.replace(/\\/g, '/') : null;
  const episode = await Episode.create({
    title, slug, description, audioFile, thumbnail, episodeNumber, guestName, tags: tags ? tags.split(',') : [],
    isFeatured: isFeatured === 'true', duration: duration || 0,
  });
  res.status(201).json({ success: true, message: 'Episode created', data: episode });
});

const getEpisodes = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const skip = (page - 1) * limit;
  const filter = search ? { title: { $regex: search, $options: 'i' } } : {};
  const episodes = await Episode.find(filter).skip(skip).limit(limit);
  const total = await Episode.countDocuments(filter);
  res.json({ success: true, data: episodes, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

const getEpisodeBySlug = asyncHandler(async (req, res) => {
  const episode = await Episode.findOne({ slug: req.params.slug });
  if (!episode) throw new ApiError('Episode not found', 404);
  episode.views = (episode.views || 0) + 1;
  await episode.save();
  res.json({ success: true, data: episode });
});

const updateEpisode = asyncHandler(async (req, res) => {
  const episode = await Episode.findById(req.params.id);
  if (!episode) throw new ApiError('Episode not found', 404);
  const update = { ...req.body };
  if (req.body.title) update.slug = slugify(req.body.title);
  const updated = await Episode.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json({ success: true, message: 'Episode updated', data: updated });
});

const deleteEpisode = asyncHandler(async (req, res) => {
  const episode = await Episode.findById(req.params.id);
  if (!episode) throw new ApiError('Episode not found', 404);
  if (episode.audioFile) deleteFile(episode.audioFile);
  if (episode.thumbnail) deleteFile(episode.thumbnail);
  await Episode.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Episode deleted' });
});

const getFeaturedEpisodes = asyncHandler(async (req, res) => {
  const episodes = await Episode.find({ isFeatured: true }).limit(5);
  res.json({ success: true, data: episodes });
});

const getLatestEpisodes = asyncHandler(async (req, res) => {
  const episodes = await Episode.find().sort({ createdAt: -1 }).limit(10);
  res.json({ success: true, data: episodes });
});

module.exports = { createEpisode, getEpisodes, getEpisodeBySlug, updateEpisode, deleteEpisode, getFeaturedEpisodes, getLatestEpisodes };
