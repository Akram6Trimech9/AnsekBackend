const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createFolderIfNotExists = (folder) => {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
};

const storageFor = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '..', 'uploads', folder);
      createFolderIfNotExists(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, name);
    },
  });

const imageFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) return cb(null, true);
  cb(new Error('Only image files are allowed'));
};

const audioFilter = (req, file, cb) => {
  const allowed = /mp3|wav|m4a/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) return cb(null, true);
  cb(new Error('Only audio files are allowed'));
};

const limits = { fileSize: 50 * 1024 * 1024 };

module.exports = { storageFor, imageFilter, audioFilter, limits };
