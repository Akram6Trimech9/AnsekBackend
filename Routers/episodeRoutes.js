const express = require('express');
const multer = require('multer');
const { storageFor, audioFilter, limits } = require('../Config/multerConfig');
const { createEpisode, getEpisodes, getEpisodeBySlug, updateEpisode, deleteEpisode, getFeaturedEpisodes, getLatestEpisodes } = require('../Controllers/episodeController');
const { validateEpisode } = require('../validations/validators');
const { protect } = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

const router = express.Router();
const upload = multer({ storage: storageFor('podcast'), fileFilter: audioFilter, limits });

router.get('/', getEpisodes);
router.get('/featured', getFeaturedEpisodes);
router.get('/latest', getLatestEpisodes);
router.get('/:slug', getEpisodeBySlug);
router.post('/', protect, admin, upload.fields([{ name: 'audioFile' }, { name: 'thumbnail' }]), validateEpisode, createEpisode);
router.put('/:id', protect, admin, upload.fields([{ name: 'audioFile' }, { name: 'thumbnail' }]), updateEpisode);
router.delete('/:id', protect, admin, deleteEpisode);

module.exports = router;
